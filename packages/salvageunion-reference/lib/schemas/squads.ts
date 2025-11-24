/**
 * NPC squads and groups in Salvage Union
 * Converted from schemas/squads.schema.json
 */

import { z } from 'zod'
import * as common from './shared/common.js'
import * as enums from './shared/enums.js'
import * as objects from './shared/objects.js'

/**
 * Squads item schema
 */
export const squadsItemSchema = objects.baseEntity
  .extend({
    hitPoints: common.hitPoints.optional(),
    actions: z.array(z.string()),
    traits: z
      .array(objects.trait)
      .optional()
      .describe('Special traits and properties of items, systems, or abilities'),
    damageType: enums.damageType.optional(),
  })
  .strict()

/**
 * Squads array schema
 */
export const squadsSchema = z.array(squadsItemSchema).meta({
  id: 'https://salvageunion.com/schemas/squads.schema.json',
  title: 'squads',
  description: 'NPC squads and groups in Salvage Union',
})
