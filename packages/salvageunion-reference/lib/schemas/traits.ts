/**
 * Traits and special properties in Salvage Union
 * Converted from schemas/traits.schema.json
 */

import * as objects from './shared/objects.js'

/**
 * Traits item schema
 */
export const traitsItemSchema = objects.baseEntity
  .extend({
    content: objects.content.optional(),
  })
  .strict()

import { z } from 'zod'

/**
 * Traits array schema
 */
export const traitsSchema = z.array(traitsItemSchema).meta({
  id: 'https://salvageunion.com/schemas/traits.schema.json',
  title: 'traits',
  description: 'Traits and special properties in Salvage Union',
})
