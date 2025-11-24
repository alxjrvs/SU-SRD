/**
 * Shared complex object definitions for Salvage Union game data
 * Converted from shared/objects.schema.json
 */

import { z } from 'zod'
import * as common from './common.js'
import * as enums from './enums.js'

/**
 * Special traits and properties of items, systems, or abilities
 */
export const trait = z
  .object({
    amount: z.union([common.nonNegativeInteger, z.string().describe('Variable value')]).optional(),
    type: z.string(),
  })
  .strict()
  .describe('Special traits and properties of items, systems, or abilities')
  .meta({
    title: 'Trait',
    description: 'Special traits and properties of items, systems, or abilities',
  })

/**
 * Statistics for mechs, chassis, and vehicles
 */
export const stats = z
  .object({
    structurePoints: common.nonNegativeInteger.optional(),
    energyPoints: common.nonNegativeInteger.optional(),
    heatCapacity: common.nonNegativeInteger.optional(),
    systemSlots: common.nonNegativeInteger.optional(),
    moduleSlots: common.nonNegativeInteger.optional(),
    cargoCapacity: common.nonNegativeInteger.optional(),
    techLevel: common.techLevel.optional(),
    salvageValue: common.salvageValue.optional(),
  })
  .describe('Statistics for mechs, chassis, and vehicles')
  .meta({
    title: 'Stats',
    description: 'Statistics for mechs, chassis, and vehicles',
  })

/**
 * Statistics specific to chassis
 */
export const chassisStats = z
  .object({
    structurePoints: common.nonNegativeInteger.optional(),
    energyPoints: common.nonNegativeInteger.optional(),
    heatCapacity: common.nonNegativeInteger.optional(),
    systemSlots: common.nonNegativeInteger.optional(),
    moduleSlots: common.nonNegativeInteger.optional(),
    cargoCapacity: common.nonNegativeInteger.optional(),
    techLevel: common.techLevel.optional(),
    salvageValue: common.salvageValue.optional(),
  })
  .describe('Statistics specific to chassis')
  .meta({
    title: 'Chassis Stats',
    description: 'Statistics specific to chassis',
  })

/**
 * Statistics for equipment (systems and modules)
 */
export const equipmentStats = z
  .object({
    techLevel: common.techLevel.optional(),
    salvageValue: common.salvageValue.optional(),
  })
  .describe('Statistics for equipment (systems and modules)')
  .meta({
    title: 'Equipment Stats',
    description: 'Statistics for equipment (systems and modules)',
  })

/**
 * Entity that can perform actions and has traits
 */
export const combatEntity = z
  .object({
    actions: z.array(z.string()).optional(),
    traits: z.array(trait).optional(),
  })
  .describe('Entity that can perform actions and has traits')
  .meta({
    title: 'Combat Entity',
    description: 'Entity that can perform actions and has traits',
  })

/**
 * Mechanical entity with structure points and equipment stats
 */
export const mechanicalEntity = z
  .object({
    structurePoints: common.positiveInteger.optional(),
    techLevel: common.techLevel.optional(),
    salvageValue: common.salvageValue.optional(),
    systems: z.array(z.string()).optional(),
    traits: z.array(trait).optional(),
    energyPoints: common.nonNegativeInteger.optional(),
    heatCapacity: common.nonNegativeInteger.optional(),
    systemSlots: common.nonNegativeInteger.optional(),
    moduleSlots: common.nonNegativeInteger.optional(),
    cargoCapacity: common.nonNegativeInteger.optional(),
  })
  .describe('Mechanical entity with structure points and equipment stats')
  .meta({
    title: 'Mechanical Entity',
    description: 'Mechanical entity with structure points and equipment stats',
  })

/**
 * A data value with label, optional value, and optional type
 */
export const dataValue = z
  .object({
    label: z.union([z.string(), z.number()]).describe('The label for this data value'),
    value: z
      .union([z.string(), z.number()])
      .optional()
      .describe('Optional value for this data value'),
    type: z
      .string()
      .optional()
      .describe("Optional type for this data value (e.g., 'cost', 'keyword', 'trait', 'meta')"),
  })
  .strict()
  .describe('A data value with label, optional value, and optional type')
  .meta({
    title: 'Data Value',
    description: 'A data value with label, optional value, and optional type',
  })

/**
 * Block of structured content for rendering (paragraph, heading, list item, etc.)
 * Uses lazy() for recursive structure
 */
export const contentBlock: z.ZodType<{
  type?: z.infer<typeof enums.contentType>
  value?: string | Array<z.infer<typeof dataValue>>
  label?: string
  level?: number
  items?: Array<z.infer<typeof contentBlock>>
}> = z.lazy(() =>
  z
    .object({
      type: enums.contentType.optional(),
      value: z
        .union([
          z.string().describe('The text content of this block'),
          z.array(dataValue).describe("Array of data values when type is 'datavalues'"),
        ])
        .optional(),
      label: z
        .string()
        .optional()
        .describe('Optional label for this content block (e.g., for labeled sections)'),
      level: z
        .number()
        .int()
        .min(1)
        .max(6)
        .optional()
        .describe("Heading level (1-6) when type is 'heading'"),
      items: z
        .array(contentBlock)
        .optional()
        .describe('Nested content blocks (e.g., list items within a list)'),
    })
    .strict()
    .describe('Block of structured content for rendering (paragraph, heading, list item, etc.)')
    .meta({
      title: 'Content Block',
      description:
        'Block of structured content for rendering (paragraph, heading, list item, etc.)',
    })
)

/**
 * Content array
 */
export const content = z.array(contentBlock).describe('Array of content blocks').meta({
  title: 'Content',
  description: 'Array of content blocks',
})

/**
 * Pattern system or module
 */
export const patternSystemModule = z
  .object({
    name: common.name,
    count: common.nonNegativeInteger.optional(),
    preselectedChoices: z
      .record(z.string(), common.name)
      .optional()
      .describe('Preselected choices for this system or module, keyed by choice ID'),
  })
  .strict()
  .describe('Pattern system or module')
  .meta({
    title: 'Pattern System Module',
    description: 'Pattern system or module',
  })

/**
 * Choice constraint
 */
export const choiceConstraints = z
  .object({
    field: z.string().optional(),
    min: common.nonNegativeInteger.optional(),
    max: common.nonNegativeInteger.optional(),
  })
  .strict()
  .describe('Choice constraints')
  .meta({
    title: 'Choice Constraints',
    description: 'Choice constraints',
  })

/**
 * Choice option
 */
export const choiceOption = z
  .object({
    label: z.string().describe('Display name for this option'),
    value: z.string().describe('Identifier value for this option'),
    description: z.string().optional().describe('Optional description of this option'),
  })
  .strict()
  .describe('Choice option')
  .meta({
    title: 'Choice Option',
    description: 'Choice option',
  })

/**
 * Choice definition
 * Uses lazy() for forward reference to content
 */
export const choice: z.ZodType<{
  id: string
  name: string
  content?: Array<z.infer<typeof contentBlock>>
  rollTable?: string
  schemaEntities?: string[]
  schema?: Array<z.infer<typeof enums.schemaName>>
  customSystemOptions?: Array<z.infer<typeof systemModule>>
  setIndexable?: boolean
  multiSelect?: boolean
  choiceOptions?: Array<z.infer<typeof choiceOption>>
  constraints?: z.infer<typeof choiceConstraints>
}> = z.lazy(() =>
  z
    .object({
      id: common.id,
      name: common.name,
      content: content.optional(),
      rollTable: z.string().optional(),
      schemaEntities: z.array(z.string()).optional(),
      schema: z.array(enums.schemaName).optional(),
      customSystemOptions: z.array(systemModule).optional(),
      setIndexable: z.boolean().optional(),
      multiSelect: z
        .boolean()
        .optional()
        .describe('If true, this choice can be selected multiple times'),
      choiceOptions: z
        .array(choiceOption)
        .optional()
        .describe('Structured options for this choice (similar to actionOptions)'),
      constraints: choiceConstraints.optional(),
    })
    .strict()
    .describe('Choice definition')
    .meta({
      title: 'Choice',
      description: 'Choice definition',
    })
)

/**
 * Choices array
 */
export const choices = z.array(choice).describe('Array of choices').meta({
  title: 'Choices',
  description: 'Array of choices',
})

/**
 * NPC associated with an entity
 */
export const npc = z
  .object({
    position: common.name,
    content: content.optional(),
    hitPoints: common.hitPoints,
    choices: choices.optional(),
  })
  .strict()
  .describe('NPC associated with an entity')
  .meta({
    title: 'NPC',
    description: 'NPC associated with an entity',
  })

/**
 * System module definition
 * Uses intersection for allOf pattern
 */
export const systemModule = stats
  .extend({
    techLevel: common.techLevel,
    slotsRequired: common.nonNegativeInteger,
    salvageValue: common.salvageValue,
    recommended: z.boolean().optional(),
    count: common.nonNegativeInteger.optional(),
    actions: z.array(z.string()),
  })
  .describe('A system or module that can be installed on a mech')
  .meta({
    title: 'System Module',
    description: 'A system or module that can be installed on a mech',
  })

/**
 * Roll table definitions
 * Uses union for oneOf pattern
 */
export const table = z
  .union([
    // Standard roll table
    z
      .object({
        type: z.literal('standard'),
        '1': z.string().describe('Critical failure outcome'),
        '20': z.string().describe('Critical success outcome'),
        '11-19': z.string().describe('High success outcome'),
        '6-10': z.string().describe('Moderate outcome'),
        '2-5': z.string().describe('Low outcome'),
      })
      .strict()
      .describe('Standard roll table with 5 outcome ranges'),
    // Alternate roll table
    z
      .object({
        type: z.literal('alternate'),
        '1': z.string().describe('Critical failure outcome'),
        '19-20': z.string().describe('Critical success outcome'),
        '11-18': z.string().describe('High success outcome'),
        '6-10': z.string().describe('Moderate outcome'),
        '2-5': z.string().describe('Low outcome'),
      })
      .strict()
      .describe('Alternative standard roll table with different ranges'),
    // Flat roll table
    z
      .object({
        type: z.literal('flat'),
        '1': z.string(),
        '2': z.string(),
        '3': z.string(),
        '4': z.string(),
        '5': z.string(),
        '6': z.string(),
        '7': z.string(),
        '8': z.string(),
        '9': z.string(),
        '10': z.string(),
        '11': z.string(),
        '12': z.string(),
        '13': z.string(),
        '14': z.string(),
        '15': z.string(),
        '16': z.string(),
        '17': z.string(),
        '18': z.string(),
        '19': z.string(),
        '20': z.string(),
      })
      .strict()
      .describe('Flat roll table with individual outcomes for each numeric result'),
    // Dramatic roll table
    z
      .object({
        type: z.literal('dramatic'),
        '20': z.string(),
      })
      .strict()
      .describe('Dramatic roll table with only one outcome'),
    // Duos roll table
    z
      .object({
        type: z.literal('duos'),
        '1-2': z.string().describe('The name of the entity or ability'),
        '3-4': z.string().describe('The name of the entity or ability'),
        '5-6': z.string().describe('The name of the entity or ability'),
        '7-8': z.string().describe('The name of the entity or ability'),
        '9-10': z.string().describe('The name of the entity or ability'),
        '11-12': z.string().describe('The name of the entity or ability'),
        '13-14': z.string().describe('The name of the entity or ability'),
        '15-16': z.string().describe('The name of the entity or ability'),
        '17-18': z.string().describe('The name of the entity or ability'),
        '19-20': z.string().describe('The name of the entity or ability'),
      })
      .strict()
      .describe('Duos roll table with custom ranges and entity references'),
    // Bio-Chassis roll table
    z
      .object({
        type: z.literal('bio-chassis'),
        '1': z.string().describe('Critical failure outcome'),
        '2-3': z.string().describe('System destruction outcome'),
        '4-5': z.string().describe('Severe bio-backlash outcome'),
        '6-8': z.string().describe('Module destruction outcome'),
        '9-10': z.string().describe('Bio-backlash outcome'),
        '11-19': z.string().describe('Core damage outcome'),
        '20': z.string().describe('Critical success outcome'),
      })
      .strict()
      .describe('Bio-Chassis roll table with custom ranges'),
  ])
  .describe('Roll table for random outcomes based on d20 rolls')
  .meta({
    title: 'Table',
    description: 'Roll table for random outcomes based on d20 rolls',
  })

/**
 * Basic entity with name, content, source, and page reference
 */
export const baseEntity = z
  .object({
    asset_url: common.asset_url.optional(),
    content: content.optional(),
    id: common.id,
    indexable: z.boolean().default(true).optional(),
    blackMarket: z.boolean().default(false).optional(),
    name: common.name,
    source: enums.source,
    page: common.positiveInteger,
  })
  .describe('Basic entity with name, content, source, and page reference')
  .meta({
    title: 'Base Entity',
    description: 'Basic entity with name, content, source, and page reference',
  })

/**
 * Bonus values that increase with tech level
 */
export const bonusPerTechLevel = stats.describe('Bonus values that increase with tech level').meta({
  title: 'Bonus Per Tech Level',
  description: 'Bonus values that increase with tech level',
})

/**
 * Advanced or hybrid character class
 */
export const advancedClass = baseEntity
  .extend({
    hybrid: z
      .boolean()
      .optional()
      .describe('Whether this is a hybrid class (cannot be selected as initial class)'),
    advancedTree: enums.tree,
    legendaryTree: enums.tree,
    content: content.optional(),
  })
  .strict()
  .describe('Advanced or hybrid character class')
  .meta({
    title: 'Advanced Class',
    description: 'Advanced or hybrid character class',
  })

/**
 * A mech in a lance formation
 */
export const formationMech = z
  .object({
    chassis: z.string().describe('The chassis name of the mech'),
    pattern: z.string().describe('The pattern name of the mech'),
    source: enums.source.describe('The source book for this mech'),
    page: common.positiveInteger.describe('The page number where this mech can be found'),
    quantity: z
      .number()
      .int()
      .min(1)
      .optional()
      .describe('The number of this mech in the formation (defaults to 1 if not specified)'),
  })
  .strict()
  .describe('A mech in a lance formation')
  .meta({
    title: 'Formation Mech',
    description: 'A mech in a lance formation',
  })

/**
 * Grantable entity with a name and description
 */
export const grant = z
  .object({
    schema: z.union([enums.schemaName, z.literal('choice').describe('Name of the schema')]),
    name: common.name,
  })
  .strict()
  .describe('Grantable entity with a name and description')
  .meta({
    title: 'Grant',
    description: 'Grantable entity with a name and description',
  })

/**
 * Traits array
 */
export const traits = z.array(trait).describe('Array of traits').meta({
  title: 'Traits',
  description: 'Array of traits',
})

/**
 * Action damage
 */
export const actionDamage = z
  .object({
    damageType: enums.damageType,
    amount: z.union([common.nonNegativeInteger, z.string().describe('Variable damage formula')]),
  })
  .strict()
  .describe('Damage dealt by an attack or ability')
  .meta({
    title: 'Action Damage',
    description: 'Damage dealt by an attack or ability',
  })

/**
 * An action, ability, or attack that can be performed
 */
export const action = z
  .object({
    id: common.id,
    content: content.optional(),
    structurePoints: z.number().optional(),
    energyPoints: z.number().optional(),
    heatCapacity: z.number().optional(),
    systemSlots: z.number().optional(),
    moduleSlots: z.number().optional(),
    cargoCapacity: z.number().optional(),
    techLevel: common.techLevel.optional(),
    salvageValue: z.number().optional(),
    name: common.name,
    displayName: common.name
      .optional()
      .describe('Optional display name for the action. Falls back to name if not provided.'),
    activationCost: common.activationCost.optional(),
    range: enums.range.optional(),
    actionType: enums.actionType.optional(),
    traits: z.array(trait).optional(),
    damage: actionDamage.optional(),
    choices: choices.optional(),
    table: table.optional(),
    hidden: z
      .boolean()
      .optional()
      .describe('If true, this action will not affect the rendering of the entity display'),
    activationCurrency: z
      .enum(['EP or AP', 'SP or HP', 'Variable'])
      .optional()
      .describe('The currency type for activation cost (EP/AP, SP/HP, or Variable)'),
    source: enums.source.optional(),
    page: common.positiveInteger.optional(),
    actionSource: enums.schemaName
      .optional()
      .describe(
        "The schema name that this action is used in (e.g., 'chassis', 'systems', 'modules')"
      ),
  })
  .describe('An action, ability, or attack that can be performed')
  .meta({
    title: 'Action',
    description: 'An action, ability, or attack that can be performed',
  })

/**
 * Schema entities array
 */
export const schemaEntities = z.array(z.string()).describe('Array of schema entity IDs').meta({
  title: 'Schema Entities',
  description: 'Array of schema entity IDs',
})

/**
 * Schema name (can be from enum or "actions")
 */
export const schemaNameExtended = z
  .union([enums.schemaName, z.literal('actions')])
  .describe('Schema name')
  .meta({
    title: 'Schema Name Extended',
    description: 'Schema name',
  })

/**
 * Schema names array
 */
export const schemaNames = z.array(enums.schemaName).describe('Array of schema names').meta({
  title: 'Schema Names',
  description: 'Array of schema names',
})

/**
 * Systems array
 */
export const systems = z.array(z.string()).describe('Array of system names').meta({
  title: 'Systems',
  description: 'Array of system names',
})

/**
 * Modules array
 */
export const modules = z.array(z.string()).describe('Array of module names').meta({
  title: 'Modules',
  description: 'Array of module names',
})

/**
 * Custom system options array
 */
export const customSystemOptions = z
  .array(systemModule)
  .describe('Array of custom system options')
  .meta({
    title: 'Custom System Options',
    description: 'Array of custom system options',
  })

/**
 * Action options array
 */
export const actionOptions = z
  .array(
    z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .strict()
  )
  .describe('Array of action options')
  .meta({
    title: 'Action Options',
    description: 'Array of action options',
  })

/**
 * Mech chassis pattern configuration
 */
export const pattern = z
  .object({
    name: common.name,
    content: content.optional(),
    legalStarting: z.boolean().optional(),
    systems: z.array(patternSystemModule),
    modules: z.array(patternSystemModule),
    drone: z
      .object({
        systems: z.array(z.string()),
        modules: z.array(z.string()),
      })
      .strict()
      .optional()
      .describe('Optional drone configuration'),
  })
  .strict()
  .describe('Mech chassis pattern configuration')
  .meta({
    title: 'Pattern',
    description: 'Mech chassis pattern configuration',
  })
