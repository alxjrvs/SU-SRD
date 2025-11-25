/**
 * TypeScript object and array types
 */

import type {
  SURefEnumActionType,
  SURefEnumContentType,
  SURefEnumDamageType,
  SURefEnumRange,
  SURefEnumSchemaName,
  SURefEnumSource,
  SURefEnumTree,
} from './enums.js'

import type {
  SURefCommonActivationCost,
  SURefCommonAssetUrl,
  SURefCommonHitPoints,
  SURefCommonId,
  SURefCommonName,
  SURefCommonNonNegativeInteger,
  SURefCommonPositiveInteger,
  SURefCommonSalvageValue,
  SURefCommonTechLevel,
} from './common.js'

/**
 * Special traits and properties of items, systems, or abilities
 */
export interface SURefObjectTrait {
  amount?: SURefCommonNonNegativeInteger | string
  type: string
}

/**
 * Statistics for mechs, chassis, and vehicles
 */
export interface SURefObjectStats {
  structurePoints?: SURefCommonNonNegativeInteger
  energyPoints?: SURefCommonNonNegativeInteger
  heatCapacity?: SURefCommonNonNegativeInteger
  systemSlots?: SURefCommonNonNegativeInteger
  moduleSlots?: SURefCommonNonNegativeInteger
  cargoCapacity?: SURefCommonNonNegativeInteger
  techLevel?: SURefCommonTechLevel
  salvageValue?: SURefCommonSalvageValue
}

/**
 * Statistics specific to chassis
 */
export interface SURefObjectChassisStats {
  structurePoints?: SURefCommonNonNegativeInteger
  energyPoints?: SURefCommonNonNegativeInteger
  heatCapacity?: SURefCommonNonNegativeInteger
  systemSlots?: SURefCommonNonNegativeInteger
  moduleSlots?: SURefCommonNonNegativeInteger
  cargoCapacity?: SURefCommonNonNegativeInteger
  techLevel?: SURefCommonTechLevel
  salvageValue?: SURefCommonSalvageValue
}

/**
 * Statistics for equipment (systems and modules)
 */
export interface SURefObjectEquipmentStats {
  techLevel?: SURefCommonTechLevel
  salvageValue?: SURefCommonSalvageValue
}

/**
 * Entity that can perform actions and has traits
 */
export interface SURefObjectCombatEntity {
  actions?: string[]
  traits?: SURefObjectTrait[]
}

/**
 * Mechanical entity with structure points and equipment stats
 */
export interface SURefObjectMechanicalEntity {
  structurePoints?: SURefCommonPositiveInteger
  techLevel?: SURefCommonTechLevel
  salvageValue?: SURefCommonSalvageValue
  systems?: string[]
  traits?: SURefObjectTrait[]
  energyPoints?: SURefCommonNonNegativeInteger
  heatCapacity?: SURefCommonNonNegativeInteger
  systemSlots?: SURefCommonNonNegativeInteger
  moduleSlots?: SURefCommonNonNegativeInteger
  cargoCapacity?: SURefCommonNonNegativeInteger
}

/**
 * NPC associated with an entity
 */
export interface SURefObjectNpc {
  position: SURefCommonName
  content?: SURefObjectContent
  hitPoints: SURefCommonHitPoints
  choices?: SURefObjectChoices
}

export interface SURefObjectPatternSystemModule {
  name: SURefCommonName
  count?: SURefCommonNonNegativeInteger
  /**
   * Preselected choices for this system or module, keyed by choice ID
   */
  preselectedChoices?: Record<string, SURefCommonName>
}

/**
 * A system or module that can be installed on a mech
 */
export interface SURefObjectSystemModule extends SURefObjectStats {
  techLevel: SURefCommonTechLevel
  slotsRequired: SURefCommonNonNegativeInteger
  salvageValue: SURefCommonSalvageValue
  recommended?: boolean
  count?: SURefCommonNonNegativeInteger
  actions: string[]
}

export interface SURefObjectChoice {
  id: SURefCommonId
  name: SURefCommonName
  content?: SURefObjectContent
  rollTable?: string
  schemaEntities?: string[]
  schema?: SURefEnumSchemaName[]
  customSystemOptions?: SURefObjectSystemModule[]
  setIndexable?: boolean
  /**
   * If true, this choice can be selected multiple times
   */
  multiSelect?: boolean
  /**
   * Structured options for this choice (similar to actionOptions)
   */
  choiceOptions?: {
    /**
     * Display name for this option
     */
    label: string
    /**
     * Identifier value for this option
     */
    value: string
    /**
     * Optional description of this option
     */
    description?: string
  }[]
  constraints?: {
    field?: string
    min?: SURefCommonNonNegativeInteger
    max?: SURefCommonNonNegativeInteger
  }
}

/**
 * Basic entity with name, content, source, and page reference
 */
export interface SURefObjectBaseEntity {
  asset_url?: SURefCommonAssetUrl
  content?: SURefObjectContent
  id: SURefCommonId
  indexable?: boolean
  blackMarket?: boolean
  name: SURefCommonName
  source: SURefEnumSource
  page: SURefCommonPositiveInteger
}

/**
 * Bonus values that increase with tech level
 */
export type SURefObjectBonusPerTechLevel = SURefObjectStats

/**
 * Advanced or hybrid character class
 */
export interface SURefObjectAdvancedClass extends SURefObjectBaseEntity {
  /**
   * Whether this is a hybrid class (cannot be selected as initial class)
   */
  hybrid?: boolean
  advancedTree: SURefEnumTree
  legendaryTree: SURefEnumTree
  content?: SURefObjectContent
}

/**
 * A data value with label, optional value, and optional type
 */
export interface SURefObjectDataValue {
  /**
   * The label for this data value
   */
  label: string | number
  /**
   * Optional value for this data value
   */
  value?: string | number
  /**
   * Optional type for this data value (e.g., 'cost', 'keyword', 'trait', 'meta')
   */
  type?: string
}

/**
 * Block of structured content for rendering (paragraph, heading, list item, etc.)
 */
export interface SURefObjectContentBlock {
  type?: SURefEnumContentType
  value?: string | SURefObjectDataValue[]
  /**
   * Optional label for this content block (e.g., for labeled sections)
   */
  label?: string
  /**
   * Heading level (1-6) when type is 'heading'
   */
  level?: number
  /**
   * Nested content blocks (e.g., list items within a list)
   */
  items?: SURefObjectContentBlock[]
}

/**
 * A mech in a lance formation
 */
export interface SURefObjectFormationMech {
  /**
   * The chassis name of the mech
   */
  chassis: string
  /**
   * The pattern name of the mech
   */
  pattern: string
  /**
   * The source book for this mech
   */
  source: SURefEnumSource
  /**
   * The page number where this mech can be found
   */
  page: SURefCommonPositiveInteger
  /**
   * The number of this mech in the formation (defaults to 1 if not specified)
   */
  quantity?: number
}

/**
 * Grantable entity with a name and description
 */
export interface SURefObjectGrant {
  schema: SURefEnumSchemaName | 'choice'
  name: SURefCommonName
}

/**
 * An action, ability, or attack that can be performed
 */
export interface SURefObjectAction {
  id: SURefCommonId
  content?: SURefObjectContent
  structurePoints?: number
  energyPoints?: number
  heatCapacity?: number
  systemSlots?: number
  moduleSlots?: number
  cargoCapacity?: number
  techLevel?: SURefCommonTechLevel
  salvageValue?: number
  name: SURefCommonName
  /**
   * Optional display name for the action. Falls back to name if not provided.
   */
  displayName?: SURefCommonName
  activationCost?: SURefCommonActivationCost
  range?: SURefEnumRange
  actionType?: SURefEnumActionType
  traits?: SURefObjectTrait[]
  /**
   * Damage dealt by an attack or ability
   */
  damage?: {
    damageType: SURefEnumDamageType
    amount: SURefCommonNonNegativeInteger | string
  }
  choices?: SURefObjectChoice[]
  table?: SURefObjectTable
  /**
   * If true, this action will not affect the rendering of the entity display
   */
  hidden?: boolean
  /**
   * The currency type for activation cost (EP/AP, SP/HP, or Variable)
   */
  activationCurrency?: string
  source?: SURefEnumSource
  page?: SURefCommonPositiveInteger
  /**
   * The schema name that this action is used in (e.g., 'chassis', 'systems', 'modules')
   */
  actionSource?: SURefEnumSchemaName
}

/**
 * Mech chassis pattern configuration
 */
export interface SURefObjectPattern {
  name: SURefCommonName
  content?: SURefObjectContent
  legalStarting?: boolean
  systems: SURefObjectPatternSystemModule[]
  modules: SURefObjectPatternSystemModule[]
  /**
   * Optional drone configuration
   */
  drone?: {
    systems: string[]
    modules: string[]
  }
}

export type SURefObjectSchemaName = SURefEnumSchemaName | 'actions'

export type SURefObjectTableContent = { label?: string; value: string }
/**
 * Roll table for random outcomes based on d20 rolls
 */
export type SURefObjectTable =
  | {
      /**
       * Critical failure outcome
       */
      '1': SURefObjectTableContent
      /**
       * Critical success outcome
       */
      '20': SURefObjectTableContent
      type: 'standard'
      /**
       * High success outcome
       */
      '11-19': SURefObjectTableContent
      /**
       * Moderate outcome
       */
      '6-10': SURefObjectTableContent
      /**
       * Low outcome
       */
      '2-5': SURefObjectTableContent
    }
  | {
      /**
       * Critical failure outcome
       */
      '1': string
      type: 'alternate'
      /**
       * Critical success outcome
       */
      '19-20': SURefObjectTableContent
      /**
       * High success outcome
       */
      '11-18': SURefObjectTableContent
      /**
       * Moderate outcome
       */
      '6-10': SURefObjectTableContent
      /**
       * Low outcome
       */
      '2-5': SURefObjectTableContent
    }
  | {
      '1': SURefObjectTableContent
      '2': SURefObjectTableContent
      '3': SURefObjectTableContent
      '4': SURefObjectTableContent
      '5': SURefObjectTableContent
      '6': SURefObjectTableContent
      '7': SURefObjectTableContent
      '8': SURefObjectTableContent
      '9': SURefObjectTableContent
      '10': SURefObjectTableContent
      '11': SURefObjectTableContent
      '12': SURefObjectTableContent
      '13': SURefObjectTableContent
      '14': SURefObjectTableContent
      '15': SURefObjectTableContent
      '16': SURefObjectTableContent
      '17': SURefObjectTableContent
      '18': SURefObjectTableContent
      '19': SURefObjectTableContent
      '20': SURefObjectTableContent
      type: 'flat'
    }
  | {
      '20': SURefObjectTableContent
      type: 'dramatic'
    }
  | {
      type: 'duos'
      /**
       * The name of the entity or ability
       */
      '1-2': SURefObjectTableContent
      /**
       * The name of the entity or ability
       */
      '3-4': SURefObjectTableContent
      /**
       * The name of the entity or ability
       */
      '5-6': SURefObjectTableContent
      /**
       * The name of the entity or ability
       */
      '7-8': SURefObjectTableContent
      /**
       * The name of the entity or ability
       */
      '9-10': SURefObjectTableContent
      /**
       * The name of the entity or ability
       */
      '11-12': SURefObjectTableContent
      /**
       * The name of the entity or ability
       */
      '13-14': SURefObjectTableContent
      /**
       * The name of the entity or ability
       */
      '15-16': SURefObjectTableContent
      /**
       * The name of the entity or ability
       */
      '17-18': SURefObjectTableContent
      /**
       * The name of the entity or ability
       */
      '19-20': SURefObjectTableContent
    }
  | {
      /**
       * Critical failure outcome
       */
      '1': SURefObjectTableContent
      /**
       * Critical success outcome
       */
      '20': SURefObjectTableContent
      type: 'bio-chassis'
      /**
       * System destruction outcome
       */
      '2-3': SURefObjectTableContent
      /**
       * Severe bio-backlash outcome
       */
      '4-5': SURefObjectTableContent
      /**
       * Module destruction outcome
       */
      '6-8': SURefObjectTableContent
      /**
       * Bio-backlash outcome
       */
      '9-10': SURefObjectTableContent
      /**
       * Core damage outcome
       */
      '11-19': SURefObjectTableContent
    }

export type SURefObjectActionOptions = {
  label: string
  value: string
}[]

export type SURefObjectChoices = SURefObjectChoice[]

export type SURefObjectContent = SURefObjectContentBlock[]

export type SURefObjectCustomSystemOptions = SURefObjectSystemModule[]

export type SURefObjectModules = string[]

export type SURefObjectSchemaEntities = string[]

export type SURefObjectSchemaNames = SURefEnumSchemaName[]

export type SURefObjectSystems = string[]

export type SURefObjectTraits = SURefObjectTrait[]
