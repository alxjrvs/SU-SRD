/**
 * Game keywords and terminology in Salvage Union
 * Converted from schemas/keywords.schema.json
 */

import * as objects from './shared/objects.js'

/**
 * Keywords item schema
 */
export const keywordsItemSchema = objects.baseEntity
  .extend({
    content: objects.content.optional(),
  })
  .strict()

import { z } from 'zod'

/**
 * Keywords array schema
 */
export const keywordsSchema = z.array(keywordsItemSchema).meta({
  id: 'https://salvageunion.com/schemas/keywords.schema.json',
  title: 'keywords',
  description: 'Game keywords and terminology in Salvage Union',
})
