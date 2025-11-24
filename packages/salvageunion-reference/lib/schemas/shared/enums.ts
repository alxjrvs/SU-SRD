/**
 * Shared enumeration definitions for Salvage Union game data
 * Converted from shared/enums.schema.json
 */

import { z } from 'zod'

/**
 * The source book or expansion for this content
 */
export const source = z
  .enum([
    'Salvage Union Workshop Manual',
    'Mech Monday',
    'We Were Here First!',
    'Rainmaker',
    'False Flag',
  ])
  .describe('The source book or expansion for this content')
  .meta({
    title: 'Source',
    description: 'The source book or expansion for this content',
  })

/**
 * Type of content block for rendering structured text
 */
export const contentType = z
  .enum(['paragraph', 'heading', 'list-item', 'label', 'datavalues', 'hint'])
  .describe('Type of content block for rendering structured text')
  .meta({
    title: 'Content Type',
    description: 'Type of content block for rendering structured text',
  })

/**
 * Range bands for abilities and weapons
 */
export const range = z
  .array(z.enum(['Close', 'Medium', 'Long', 'Far']))
  .min(1)
  .describe('Range bands for abilities and weapons')
  .meta({
    title: 'Range',
    description: 'Range bands for abilities and weapons',
  })

/**
 * Type of action required to use an ability
 */
export const actionType = z
  .enum(['Passive', 'Free', 'Reaction', 'Turn', 'Short', 'Long', 'DownTime'])
  .describe('Type of action required to use an ability')
  .meta({
    title: 'Action Type',
    description: 'Type of action required to use an ability',
  })

/**
 * Type of damage
 */
export const damageType = z.enum(['HP', 'SP']).describe('Type of damage').meta({
  title: 'Damage Type',
  description: 'Type of damage',
})

/**
 * Type of advanced class
 */
export const classType = z.enum(['Advanced', 'Hybrid']).describe('Type of advanced class').meta({
  title: 'Class Type',
  description: 'Type of advanced class',
})

/**
 * Ability tree name
 */
export const tree = z
  .enum([
    'Advanced Engineer',
    'Advanced Hacking',
    'Advanced Hauler',
    'Advanced Scout',
    'Advanced Soldier',
    'Augmentation',
    'Cyborg',
    'Electronics',
    'Fabricator',
    'Forging',
    'Generic',
    'Gladitorial Combat',
    'Hacking',
    'Leadership',
    'Legendary Cyborg',
    'Legendary Engineer',
    'Legendary Fabricator',
    'Legendary Hacker',
    'Legendary Hauler',
    'Legendary Ranger',
    'Legendary Scout',
    'Legendary Smuggler',
    'Legendary Soldier',
    'Legendary Union Rep',
    'Mech-Tech',
    'Mechanical Knowledge',
    'Ranger',
    'Recon',
    'Salvaging',
    'Sleuth',
    'Smuggler',
    'Sniper',
    'Survivalist',
    'Tactical Warfare',
    'Trading',
    'Union Rep',
  ])
  .describe('Ability tree name')
  .meta({
    title: 'Tree',
    description: 'Ability tree name',
  })

/**
 * Name of the schema
 */
export const schemaName = z
  .enum([
    'abilities',
    'ability-tree-requirements',
    'bio-titans',
    'chassis',
    'classes',
    'crawler-bays',
    'crawler-tech-levels',
    'crawlers',
    'creatures',
    'distances',
    'drones',
    'equipment',
    'keywords',
    'factions',
    'meld',
    'modules',
    'npcs',
    'roll-tables',
    'squads',
    'systems',
    'traits',
    'vehicles',
  ])
  .describe('Name of the schema')
  .meta({
    title: 'Schema Name',
    description: 'Name of the schema',
  })
