/**
 * Pilot abilities and skills in Salvage Union
 * Converted from schemas/abilities.schema.json
 */

import { z } from 'zod'
import * as enums from './shared/enums.js'
import * as objects from './shared/objects.js'

/**
 * Ability level (1-3, "L" for Legendary, or "G" for Generic)
 */
const abilityLevel = z.union([z.number().int().min(1).max(3), z.literal('L'), z.literal('G')])

/**
 * Abilities item schema
 */
export const abilitiesItemSchema = objects.baseEntity
  .extend({
    description: z.string().optional(),
    tree: enums.tree,
    level: abilityLevel,
    mechActionType: enums.actionType.optional(),
    grants: z.array(objects.grant).optional(),
    activationCurrency: z.enum(['Variable', 'EP or AP', 'SP or HP']).optional(),
    actions: z.array(z.string()).optional(),
  })
  .strict()

/**
 * Abilities array schema
 */
export const abilitiesSchema = z.array(abilitiesItemSchema).meta({
  id: 'https://salvageunion.com/schemas/abilities.schema.json',
  title: 'abilities',
  description: 'Pilot abilities and skills in Salvage Union',
})
