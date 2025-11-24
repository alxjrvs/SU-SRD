import { describe, expect, it } from 'vitest'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import schemaIndex from '../schemas/index.json' with { type: 'json' }
import { getZodSchema } from './schemas/index.js'

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

describe('Schema Validation', () => {
  // Create a test for each data file
  for (const config of validationConfigs) {
    it(`should validate ${config.title}`, () => {
      const data = loadJson(config.dataFile)
      const schema = getZodSchema(config.id)

      if (!schema) {
        throw new Error(`Schema not found for ${config.id}`)
      }

      const result = schema.safeParse(data)

      if (!result.success) {
        // Format errors for better test output
        const errorMessages = result.error.issues.map((error, index) => {
          const path = error.path.join('.') || 'root'
          return `  ${index + 1}. ${path}: ${error.message}`
        })

        // Show first 10 errors in the test output
        const displayErrors = errorMessages.slice(0, 10)
        const remainingCount = errorMessages.length - 10

        let errorOutput = `${config.title} validation failed with ${result.error.issues.length} error(s):\n`
        errorOutput += displayErrors.join('\n')

        if (remainingCount > 0) {
          errorOutput += `\n  ... and ${remainingCount} more error(s)`
        }

        throw new Error(errorOutput)
      }

      expect(result.success).toBe(true)
    })
  }
})

describe('Schema Files', () => {
  it('should have all schemas registered in index.json', () => {
    expect(schemaIndex.schemas.length).toBeGreaterThan(0)
  })

  it('should have valid schema file paths', () => {
    for (const config of validationConfigs) {
      expect(() => loadJson(config.schemaFile)).not.toThrow()
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

  it('should have Zod schemas for all schema IDs', () => {
    for (const schema of schemaIndex.schemas) {
      const zodSchema = getZodSchema(schema.id)
      expect(zodSchema).toBeDefined()
    }
  })
})

describe('Schema Catalog Enhancement', () => {
  it('should have display names for all schemas', async () => {
    const catalog = await import('./ModelFactory.js').then((m) => m.getSchemaCatalog())

    for (const schema of catalog.schemas) {
      expect(schema.displayName).toBeDefined()
      expect(schema.displayNamePlural).toBeDefined()
      expect(typeof schema.displayName).toBe('string')
      expect(typeof schema.displayNamePlural).toBe('string')
      expect(schema.displayName.length).toBeGreaterThan(0)
      expect(schema.displayNamePlural.length).toBeGreaterThan(0)
    }
  })
})
