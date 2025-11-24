/**
 * Meld-infected creatures in Salvage Union
 * Converted from schemas/meld.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Meld item schema
 */
export const meldItemSchema = objects.baseEntity
  .extend({
    actions: z.array(z.string()),
    traits: z
      .array(objects.trait)
      .optional()
      .describe('Special traits and properties of items, systems, or abilities'),
    salvageValue: z.number().int().min(0).optional().describe('Salvage value of the meld creature'),
    hitPoints: z.number().int().min(0).optional().describe('Hit points of the meld creature'),
    structurePoints: z
      .number()
      .int()
      .min(0)
      .optional()
      .describe('Structure points of the meld creature'),
  })
  .strict()

/**
 * Meld array schema
 */
export const meldSchema = z.array(meldItemSchema).meta({
  id: 'https://salvageunion.com/schemas/meld.schema.json',
  title: 'meld',
  description: 'Meld-infected creatures in Salvage Union',
})
