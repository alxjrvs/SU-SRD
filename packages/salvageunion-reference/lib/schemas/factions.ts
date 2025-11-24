/**
 * Faction groups and organizations in Salvage Union
 * Converted from schemas/factions.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Factions item schema
 */
export const factionsItemSchema = objects.baseEntity
  .extend({
    goals: z.string().describe('The goals and motivations of this faction'),
    assets: z.string().describe('The assets and resources controlled by this faction'),
    weaknesses: z.string().describe('The weaknesses and vulnerabilities of this faction'),
    formation: z
      .array(objects.formationMech)
      .optional()
      .describe('The mechs that make up this faction formation'),
    content: objects.content.optional(),
  })
  .strict()

/**
 * Factions array schema
 */
export const factionsSchema = z.array(factionsItemSchema).meta({
  id: 'https://salvageunion.com/schemas/factions.schema.json',
  title: 'factions',
  description: 'Faction groups and organizations in Salvage Union',
})
