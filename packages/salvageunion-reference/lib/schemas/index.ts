/**
 * Zod schema exports for all Salvage Union data schemas
 * This is the source of truth for all validation
 */

// Shared schemas
export * from './shared/common.js'
export * from './shared/enums.js'
export * from './shared/objects.js'

// Individual schemas
export * from './abilities.js'
export * from './ability-tree-requirements.js'
export * from './actions.js'
export * from './bio-titans.js'
export * from './chassis.js'
export * from './classes.js'
export * from './crawler-bays.js'
export * from './crawler-tech-levels.js'
export * from './crawlers.js'
export * from './creatures.js'
export * from './distances.js'
export * from './drones.js'
export * from './equipment.js'
export * from './factions.js'
export * from './keywords.js'
export * from './meld.js'
export * from './modules.js'
export * from './npcs.js'
export * from './roll-tables.js'
export * from './squads.js'
export * from './systems.js'
export * from './traits.js'
export * from './vehicles.js'

// Registry
export { schemaRegistry } from './registry.js'

// Schema map for easy access by schema name
import { abilitiesSchema } from './abilities.js'
import { abilityTreeRequirementsSchema } from './ability-tree-requirements.js'
import { actionsSchema } from './actions.js'
import { bioTitansSchema } from './bio-titans.js'
import { chassisSchema } from './chassis.js'
import { classesSchema } from './classes.js'
import { crawlerBaysSchema } from './crawler-bays.js'
import { crawlerTechLevelsSchema } from './crawler-tech-levels.js'
import { crawlersSchema } from './crawlers.js'
import { creaturesSchema } from './creatures.js'
import { distancesSchema } from './distances.js'
import { dronesSchema } from './drones.js'
import { equipmentSchema } from './equipment.js'
import { factionsSchema } from './factions.js'
import { keywordsSchema } from './keywords.js'
import { meldSchema } from './meld.js'
import { modulesSchema } from './modules.js'
import { npcsSchema } from './npcs.js'
import { rollTablesSchema } from './roll-tables.js'
import { squadsSchema } from './squads.js'
import { systemsSchema } from './systems.js'
import { traitsSchema } from './traits.js'
import { vehiclesSchema } from './vehicles.js'
import type { z } from 'zod'

/**
 * Map of schema names to Zod schemas
 */
export const schemaMap: Record<string, z.ZodSchema<unknown>> = {
  abilities: abilitiesSchema,
  'ability-tree-requirements': abilityTreeRequirementsSchema,
  actions: actionsSchema,
  'bio-titans': bioTitansSchema,
  chassis: chassisSchema,
  classes: classesSchema,
  'crawler-bays': crawlerBaysSchema,
  'crawler-tech-levels': crawlerTechLevelsSchema,
  crawlers: crawlersSchema,
  creatures: creaturesSchema,
  distances: distancesSchema,
  drones: dronesSchema,
  equipment: equipmentSchema,
  factions: factionsSchema,
  keywords: keywordsSchema,
  meld: meldSchema,
  modules: modulesSchema,
  npcs: npcsSchema,
  'roll-tables': rollTablesSchema,
  squads: squadsSchema,
  systems: systemsSchema,
  traits: traitsSchema,
  vehicles: vehiclesSchema,
}

/**
 * Get a Zod schema by schema name
 */
export function getZodSchema(schemaName: string): z.ZodSchema<unknown> | undefined {
  return schemaMap[schemaName]
}
