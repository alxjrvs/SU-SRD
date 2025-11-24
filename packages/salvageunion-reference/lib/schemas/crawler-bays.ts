/**
 * Bays and facilities on Union Crawlers in Salvage Union
 * Converted from schemas/crawler-bays.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Crawler-bays item schema
 */
export const crawlerBaysItemSchema = objects.baseEntity
  .extend({
    damagedEffect: z.string().describe('Effect when this bay is damaged'),
    npc: objects.npc,
    choices: objects.choices.optional(),
    table: objects.table.optional(),
  })
  .strict()

/**
 * Crawler-bays array schema
 */
export const crawlerBaysSchema = z.array(crawlerBaysItemSchema).meta({
  id: 'https://salvageunion.com/schemas/crawler-bays.schema.json',
  title: 'crawler-bays',
  description: 'Bays and facilities on Union Crawlers in Salvage Union',
})
