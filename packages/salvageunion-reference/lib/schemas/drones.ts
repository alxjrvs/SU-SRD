/**
 * Autonomous drones in Salvage Union
 * Converted from schemas/drones.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Drones item schema
 */
export const dronesItemSchema = objects.baseEntity.merge(objects.mechanicalEntity).strict()

/**
 * Drones array schema
 */
export const dronesSchema = z.array(dronesItemSchema).meta({
  id: 'https://salvageunion.com/schemas/drones.schema.json',
  title: 'drones',
  description: 'Autonomous drones in Salvage Union',
})
