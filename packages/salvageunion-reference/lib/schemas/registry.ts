/**
 * Zod schema registry for shared schemas
 * Used for $ref resolution and JSON Schema export
 */

import { z } from 'zod'
import * as common from './shared/common.js'
import * as enums from './shared/enums.js'
import * as objects from './shared/objects.js'

/**
 * Registry for all shared schemas
 * Schemas are registered with IDs matching JSON Schema $id values
 */
export const schemaRegistry = z.globalRegistry

// Register common schemas
schemaRegistry.add(common.nonNegativeInteger, {
  id: 'shared/common.schema.json#/definitions/nonNegativeInteger',
  title: 'Non-negative Integer',
  description: 'Non-negative integer (0 or greater)',
})

schemaRegistry.add(common.positiveInteger, {
  id: 'shared/common.schema.json#/definitions/positiveInteger',
  title: 'Positive Integer',
  description: 'Positive integer (1 or greater)',
})

schemaRegistry.add(common.id, {
  id: 'shared/common.schema.json#/definitions/id',
  title: 'ID',
  description: 'Unique identifier for the entry',
})

schemaRegistry.add(common.asset_url, {
  id: 'shared/common.schema.json#/definitions/asset_url',
  title: 'Asset URL',
  description: 'URL to an image asset for this entry',
})

schemaRegistry.add(common.activationCost, {
  id: 'shared/common.schema.json#/definitions/activationCost',
  title: 'Activation Cost',
  description: 'Cost in ability points to activate an ability',
})

schemaRegistry.add(common.name, {
  id: 'shared/common.schema.json#/definitions/name',
  title: 'Name',
  description: 'Name of the entry',
})

schemaRegistry.add(common.techLevel, {
  id: 'shared/common.schema.json#/definitions/techLevel',
  title: 'Tech Level',
  description: "Technology level of the item or entity (number, 'B' for Bio, or 'N' for Nanite)",
})

schemaRegistry.add(common.salvageValue, {
  id: 'shared/common.schema.json#/definitions/salvageValue',
  title: 'Salvage Value',
  description: 'Salvage value in credits',
})

schemaRegistry.add(common.hitPoints, {
  id: 'shared/common.schema.json#/definitions/hitPoints',
  title: 'Hit Points',
  description: 'Hit points for creatures and personnel',
})

schemaRegistry.add(common.structurePoints, {
  id: 'shared/common.schema.json#/definitions/structurePoints',
  title: 'Structure Points',
  description: 'Structure points for mechs, vehicles, and titans',
})

// Register enum schemas
schemaRegistry.add(enums.source, {
  id: 'shared/enums.schema.json#/definitions/source',
  title: 'Source',
  description: 'The source book or expansion for this content',
})

schemaRegistry.add(enums.contentType, {
  id: 'shared/enums.schema.json#/definitions/contentType',
  title: 'Content Type',
  description: 'Type of content block for rendering structured text',
})

schemaRegistry.add(enums.range, {
  id: 'shared/enums.schema.json#/definitions/range',
  title: 'Range',
  description: 'Range bands for abilities and weapons',
})

schemaRegistry.add(enums.actionType, {
  id: 'shared/enums.schema.json#/definitions/actionType',
  title: 'Action Type',
  description: 'Type of action required to use an ability',
})

schemaRegistry.add(enums.damageType, {
  id: 'shared/enums.schema.json#/definitions/damageType',
  title: 'Damage Type',
  description: 'Type of damage',
})

schemaRegistry.add(enums.classType, {
  id: 'shared/enums.schema.json#/definitions/classType',
  title: 'Class Type',
  description: 'Type of advanced class',
})

schemaRegistry.add(enums.tree, {
  id: 'shared/enums.schema.json#/definitions/tree',
  title: 'Tree',
  description: 'Ability tree name',
})

schemaRegistry.add(enums.schemaName, {
  id: 'shared/enums.schema.json#/definitions/schemaName',
  title: 'Schema Name',
  description: 'Name of the schema',
})

// Register object schemas
schemaRegistry.add(objects.trait, {
  id: 'shared/objects.schema.json#/definitions/trait',
  title: 'Trait',
  description: 'Special traits and properties of items, systems, or abilities',
})

schemaRegistry.add(objects.stats, {
  id: 'shared/objects.schema.json#/definitions/stats',
  title: 'Stats',
  description: 'Statistics for mechs, chassis, and vehicles',
})

schemaRegistry.add(objects.chassisStats, {
  id: 'shared/objects.schema.json#/definitions/chassisStats',
  title: 'Chassis Stats',
  description: 'Statistics specific to chassis',
})

schemaRegistry.add(objects.equipmentStats, {
  id: 'shared/objects.schema.json#/definitions/equipmentStats',
  title: 'Equipment Stats',
  description: 'Statistics for equipment (systems and modules)',
})

schemaRegistry.add(objects.combatEntity, {
  id: 'shared/objects.schema.json#/definitions/combatEntity',
  title: 'Combat Entity',
  description: 'Entity that can perform actions and has traits',
})

schemaRegistry.add(objects.mechanicalEntity, {
  id: 'shared/objects.schema.json#/definitions/mechanicalEntity',
  title: 'Mechanical Entity',
  description: 'Mechanical entity with structure points and equipment stats',
})

schemaRegistry.add(objects.dataValue, {
  id: 'shared/objects.schema.json#/definitions/dataValue',
  title: 'Data Value',
  description: 'A data value with label, optional value, and optional type',
})

schemaRegistry.add(objects.contentBlock, {
  id: 'shared/objects.schema.json#/definitions/contentBlock',
  title: 'Content Block',
  description: 'Block of structured content for rendering (paragraph, heading, list item, etc.)',
})

schemaRegistry.add(objects.content, {
  id: 'shared/objects.schema.json#/definitions/content',
  title: 'Content',
  description: 'Array of content blocks',
})

schemaRegistry.add(objects.patternSystemModule, {
  id: 'shared/objects.schema.json#/definitions/patternSystemModule',
  title: 'Pattern System Module',
  description: 'Pattern system or module',
})

schemaRegistry.add(objects.choice, {
  id: 'shared/objects.schema.json#/definitions/choice',
  title: 'Choice',
  description: 'Choice definition',
})

schemaRegistry.add(objects.choices, {
  id: 'shared/objects.schema.json#/definitions/choices',
  title: 'Choices',
  description: 'Array of choices',
})

schemaRegistry.add(objects.npc, {
  id: 'shared/objects.schema.json#/definitions/npc',
  title: 'NPC',
  description: 'NPC associated with an entity',
})

schemaRegistry.add(objects.systemModule, {
  id: 'shared/objects.schema.json#/definitions/systemModule',
  title: 'System Module',
  description: 'A system or module that can be installed on a mech',
})

schemaRegistry.add(objects.table, {
  id: 'shared/objects.schema.json#/definitions/table',
  title: 'Table',
  description: 'Roll table for random outcomes based on d20 rolls',
})

schemaRegistry.add(objects.baseEntity, {
  id: 'shared/objects.schema.json#/definitions/baseEntity',
  title: 'Base Entity',
  description: 'Basic entity with name, content, source, and page reference',
})

schemaRegistry.add(objects.bonusPerTechLevel, {
  id: 'shared/objects.schema.json#/definitions/bonusPerTechLevel',
  title: 'Bonus Per Tech Level',
  description: 'Bonus values that increase with tech level',
})

schemaRegistry.add(objects.advancedClass, {
  id: 'shared/objects.schema.json#/definitions/advancedClass',
  title: 'Advanced Class',
  description: 'Advanced or hybrid character class',
})

schemaRegistry.add(objects.formationMech, {
  id: 'shared/objects.schema.json#/definitions/formationMech',
  title: 'Formation Mech',
  description: 'A mech in a lance formation',
})

schemaRegistry.add(objects.grant, {
  id: 'shared/objects.schema.json#/definitions/grant',
  title: 'Grant',
  description: 'Grantable entity with a name and description',
})

schemaRegistry.add(objects.traits, {
  id: 'shared/objects.schema.json#/definitions/traits',
  title: 'Traits',
  description: 'Array of traits',
})

schemaRegistry.add(objects.action, {
  id: 'shared/objects.schema.json#/definitions/action',
  title: 'Action',
  description: 'An action, ability, or attack that can be performed',
})

schemaRegistry.add(objects.pattern, {
  id: 'shared/objects.schema.json#/definitions/pattern',
  title: 'Pattern',
  description: 'Mech chassis pattern configuration',
})
