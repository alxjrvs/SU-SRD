/**
 * Distances in Salvage Union are abstracted into the following Range categories.
 * Both Pilots and Mechs use these Range categories for their movement as well as
 * the effective distances for their weapons and other Abilities. The Mediator can
 * factor in any other difference between the speed and distance of Pilots and Mechs
 * based on the narrative and the situation.
 *
 * Converted from schemas/distances.schema.json
 */

import * as objects from './shared/objects.js'

/**
 * Distances item schema
 */
export const distancesItemSchema = objects.baseEntity
  .extend({
    content: objects.content.optional(),
  })
  .strict()

import { z } from 'zod'

/**
 * Distances array schema
 */
export const distancesSchema = z.array(distancesItemSchema).meta({
  id: 'https://salvageunion.com/schemas/distances.schema.json',
  title: 'distances',
  description:
    'Distances in Salvage Union are abstracted into the following Range categories. Both Pilots and Mechs use these Range categories for their movement as well as the effective distances for their weapons and other Abilities. The Mediator can factor in any other difference between the speed and distance of Pilots and Mechs based on the narrative and the situation.',
})
