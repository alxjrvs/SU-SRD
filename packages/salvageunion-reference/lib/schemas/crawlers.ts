/**
 * Crawler vehicles in Salvage Union
 * Converted from schemas/crawlers.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Crawlers item schema
 */
export const crawlersItemSchema = objects.baseEntity
  .extend({
    npc: objects.npc,
    actions: z.array(z.string()),
  })
  .strict()

/**
 * Crawlers array schema
 */
export const crawlersSchema = z.array(crawlersItemSchema).meta({
  id: 'https://salvageunion.com/schemas/crawlers.schema.json',
  title: 'crawlers',
  description: 'Crawler vehicles in Salvage Union',
})
