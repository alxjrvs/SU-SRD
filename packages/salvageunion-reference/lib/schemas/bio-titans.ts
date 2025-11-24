/**
 * Massive bio-engineered titan creatures in Salvage Union
 * Converted from schemas/bio-titans.schema.json
 */

import { z } from 'zod'
import * as common from './shared/common.js'
import * as objects from './shared/objects.js'

/**
 * Bio-titans item schema
 */
export const bioTitansItemSchema = objects.baseEntity
  .extend({
    structurePoints: common.positiveInteger,
    actions: z.array(z.string()),
    traits: z
      .array(objects.trait)
      .optional()
      .describe('Special traits and properties of items, systems, or abilities'),
  })
  .strict()

/**
 * Bio-titans array schema
 */
export const bioTitansSchema = z.array(bioTitansItemSchema).meta({
  id: 'https://salvageunion.com/schemas/bio-titans.schema.json',
  title: 'bio-titans',
  description: 'Massive bio-engineered titan creatures in Salvage Union',
})
