/**
 * Mech chassis definitions in Salvage Union
 * Converted from schemas/chassis.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Chassis item schema
 */
export const chassisItemSchema = objects.baseEntity
  .merge(objects.chassisStats)
  .extend({
    chassisAbilities: z
      .array(z.string())
      .describe('Array of chassis ability names that reference actions.json'),
    patterns: z.array(objects.pattern),
    npc: objects.npc.optional(),
  })
  .strict()

/**
 * Chassis array schema
 */
export const chassisSchema = z.array(chassisItemSchema).meta({
  id: 'https://salvageunion.com/schemas/chassis.schema.json',
  title: 'chassis',
  description: 'Mech chassis definitions in Salvage Union',
})
