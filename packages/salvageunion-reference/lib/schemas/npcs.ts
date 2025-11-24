/**
 * Non-player characters and people in Salvage Union
 * Converted from schemas/npcs.schema.json
 */

import * as common from './shared/common.js'
import * as objects from './shared/objects.js'

/**
 * NPCs item schema
 */
export const npcsItemSchema = objects.baseEntity
  .merge(objects.combatEntity)
  .extend({
    hitPoints: common.hitPoints,
    bioSalvageValue: common.nonNegativeInteger
      .optional()
      .describe('Bio-salvage value for Chimerium mutants'),
  })
  .strict()

import { z } from 'zod'

/**
 * NPCs array schema
 */
export const npcsSchema = z.array(npcsItemSchema).meta({
  id: 'https://salvageunion.com/schemas/npcs.schema.json',
  title: 'npcs',
  description: 'Non-player characters and people in Salvage Union',
})
