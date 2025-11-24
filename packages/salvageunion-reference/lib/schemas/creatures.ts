/**
 * Creatures and wildlife in Salvage Union
 * Converted from schemas/creatures.schema.json
 */

import { z } from 'zod'
import * as common from './shared/common.js'
import * as objects from './shared/objects.js'

/**
 * Creatures item schema
 */
export const creaturesItemSchema = objects.baseEntity
  .merge(objects.combatEntity)
  .extend({
    hitPoints: common.hitPoints,
  })
  .strict()

/**
 * Creatures array schema
 */
export const creaturesSchema = z.array(creaturesItemSchema).meta({
  id: 'https://salvageunion.com/schemas/creatures.schema.json',
  title: 'creatures',
  description: 'Creatures and wildlife in Salvage Union',
})
