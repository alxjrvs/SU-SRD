import { describe, expect, it, beforeAll } from 'vitest'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import Ajv from 'ajv'
import addFormatsImport from 'ajv-formats'
import schemaIndex from '../schemas/index.json'

const addFormats = addFormatsImport.default || addFormatsImport

// Get the project root directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

interface ValidationConfig {
  id: string
  title: string
  dataFile: string
  schemaFile: string
}

// Build validation configs from schema catalog
const validationConfigs: ValidationConfig[] = schemaIndex.schemas.map((schema) => ({
  id: schema.id,
  title: schema.title,
  dataFile: schema.dataFile,
  schemaFile: schema.schemaFile,
}))

function loadJson(filePath: string): unknown {
  const fullPath = join(projectRoot, filePath)
  const content = readFileSync(fullPath, 'utf-8')
  return JSON.parse(content)
}

interface JSONSchemaObject {
  $id?: string
  [key: string]: unknown
}

// Create AJV instance with draft 7 support
const ajv = new Ajv({
  strict: false,
  allErrors: true,
  verbose: true,
})
addFormats(ajv)

// Load shared schemas once before all tests
beforeAll(() => {
  const sharedSchemas = [
    {
      path: 'schemas/shared/common.schema.json',
      relativeId: 'shared/common.schema.json',
    },
    {
      path: 'schemas/shared/enums.schema.json',
      relativeId: 'shared/enums.schema.json',
    },
    {
      path: 'schemas/shared/objects.schema.json',
      relativeId: 'shared/objects.schema.json',
    },
  ]

  for (const sharedInfo of sharedSchemas) {
    const sharedSchema = loadJson(sharedInfo.path) as JSONSchemaObject
    ajv.addSchema(sharedSchema, sharedInfo.relativeId)
  }
})

function loadSchema(schemaPath: string): JSONSchemaObject {
  return loadJson(schemaPath) as JSONSchemaObject
}

describe('Schema Validation', () => {
  // Create a test for each data file
  for (const config of validationConfigs) {
    it(`should validate ${config.title}`, () => {
      const data = loadJson(config.dataFile)
      const schema = loadSchema(config.schemaFile)

      const validate = ajv.compile(schema)
      const valid = validate(data)

      if (!valid && validate.errors) {
        // Format errors for better test output
        const errorMessages = validate.errors.map((error, index) => {
          const path = error.instancePath || 'root'
          return `  ${index + 1}. ${path}: ${error.message}`
        })

        // Show first 10 errors in the test output
        const displayErrors = errorMessages.slice(0, 10)
        const remainingCount = errorMessages.length - 10

        let errorOutput = `${config.title} validation failed with ${validate.errors.length} error(s):\n`
        errorOutput += displayErrors.join('\n')

        if (remainingCount > 0) {
          errorOutput += `\n  ... and ${remainingCount} more error(s)`
        }

        throw new Error(errorOutput)
      }

      expect(valid).toBe(true)
    })
  }
})

describe('Schema Files', () => {
  it('should have all schemas registered in index.json', () => {
    expect(schemaIndex.schemas.length).toBeGreaterThan(0)
  })

  it('should have valid schema file paths', () => {
    for (const config of validationConfigs) {
      expect(() => loadSchema(config.schemaFile)).not.toThrow()
    }
  })

  it('should have valid data file paths', () => {
    for (const config of validationConfigs) {
      expect(() => loadJson(config.dataFile)).not.toThrow()
    }
  })

  it('should have all schemas with required metadata', () => {
    for (const schema of schemaIndex.schemas) {
      expect(schema.id).toBeDefined()
      expect(schema.title).toBeDefined()
      expect(schema.dataFile).toBeDefined()
      expect(schema.schemaFile).toBeDefined()
    }
  })
})

describe('Schema Catalog Enhancement', () => {
  it('should have display names for all schemas', () => {
    const catalog = import('../lib/ModelFactory.js').then((m) => m.getSchemaCatalog())

    catalog.then((cat) => {
      for (const schema of cat.schemas) {
        expect(schema.displayName).toBeDefined()
        expect(schema.displayNamePlural).toBeDefined()
        expect(typeof schema.displayName).toBe('string')
        expect(typeof schema.displayNamePlural).toBe('string')
        expect(schema.displayName.length).toBeGreaterThan(0)
        expect(schema.displayNamePlural.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('Additional Properties Validation', () => {
  const testCases = [
    {
      schemaName: 'abilities',
      validData: {
        id: 'test-id',
        name: 'Test Ability',
        source: 'Salvage Union Workshop Manual',
        page: 1,
        tree: 'Generic',
        level: 1,
        actions: ['Test Ability'],
      },
      extraProperty: 'invalidProperty',
    },
    {
      schemaName: 'chassis',
      validData: {
        id: 'test-id',
        name: 'Test Chassis',
        source: 'Salvage Union Workshop Manual',
        page: 1,
        structurePoints: 10,
        energyPoints: 10,
        heatCapacity: 10,
        systemSlots: 10,
        moduleSlots: 10,
        cargoCapacity: 10,
        techLevel: 1,
        salvageValue: 1,
        chassisAbilities: [],
        patterns: [],
      },
      extraProperty: 'extraField',
    },
    {
      schemaName: 'equipment',
      validData: {
        id: 'test-id',
        name: 'Test Equipment',
        source: 'Salvage Union Workshop Manual',
        page: 1,
        techLevel: 1,
        actions: ['Test Equipment'],
      },
      extraProperty: 'unknownField',
    },
  ]

  for (const testCase of testCases) {
    describe(testCase.schemaName, () => {
      let validate: ReturnType<typeof ajv.compile>

      beforeAll(() => {
        const schemaPath = `schemas/${testCase.schemaName}.schema.json`
        const schema = loadSchema(schemaPath)
        // Remove $id to avoid conflicts if schema is already registered
        const schemaWithoutId = { ...schema }
        delete schemaWithoutId.$id
        validate = ajv.compile(schemaWithoutId)
      })

      it('should reject data with extra properties', () => {
        const invalidData = [
          {
            ...testCase.validData,
            [testCase.extraProperty]: 'This should not be allowed',
          },
        ]

        const valid = validate(invalidData)

        expect(valid).toBe(false)
        expect(validate.errors).toBeDefined()
        expect(validate.errors?.length).toBeGreaterThan(0)
        expect(validate.errors?.[0]?.keyword).toBe('additionalProperties')
      })

      it('should accept valid data without extra properties', () => {
        const validData = [testCase.validData]

        const valid = validate(validData)

        if (!valid && validate.errors) {
          const errorMessages = validate.errors.slice(0, 5).map((error) => {
            const path = error.instancePath || 'root'
            return `  ${path}: ${error.message}`
          })
          throw new Error(`Validation failed:\n${errorMessages.join('\n')}`)
        }

        expect(valid).toBe(true)
      })
    })
  }
})
