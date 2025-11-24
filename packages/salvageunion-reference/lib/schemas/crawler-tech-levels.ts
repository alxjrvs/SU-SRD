/**
 * Tech levels for Union Crawlers in Salvage Union
 * Converted from schemas/crawler-tech-levels.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Crawler-tech-levels item schema
 */
export const crawlerTechLevelsItemSchema = objects.baseEntity
  .extend({
    techLevel: z.number().int().min(1).max(6).describe('Tech level (1-6)'),
    structurePoints: z.number().int().min(0).describe('Structure points for this tech level'),
    populationMin: z.number().int().min(0).describe('Minimum approximate population'),
    populationMax: z
      .number()
      .int()
      .min(0)
      .describe('Maximum approximate population (0 means unlimited/25,000+)'),
  })
  .strict()

/**
 * Crawler-tech-levels array schema
 */
export const crawlerTechLevelsSchema = z.array(crawlerTechLevelsItemSchema).meta({
  id: 'https://salvageunion.com/schemas/crawler-tech-levels.schema.json',
  title: 'crawler-tech-levels',
  description: 'Tech levels for Union Crawlers in Salvage Union',
})
