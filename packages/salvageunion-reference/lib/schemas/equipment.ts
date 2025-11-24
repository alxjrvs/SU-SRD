/**
 * Pilot equipment and gear in Salvage Union
 * Converted from schemas/equipment.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Equipment item schema
 */
export const equipmentItemSchema = objects.baseEntity
  .merge(objects.stats)
  .extend({
    bonusPerTechLevel: objects.bonusPerTechLevel.optional(),
    choices: objects.choices.optional(),
    actions: z.array(z.string()),
  })
  .strict()

/**
 * Equipment array schema
 */
export const equipmentSchema = z.array(equipmentItemSchema).meta({
  id: 'https://salvageunion.com/schemas/equipment.schema.json',
  title: 'equipment',
  description: 'Pilot equipment and gear in Salvage Union',
})
