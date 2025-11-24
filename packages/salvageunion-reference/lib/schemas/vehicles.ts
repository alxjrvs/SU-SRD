/**
 * Conventional vehicles in Salvage Union
 * Converted from schemas/vehicles.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Vehicles item schema
 */
export const vehiclesItemSchema = objects.baseEntity.merge(objects.mechanicalEntity).strict()

/**
 * Vehicles array schema
 */
export const vehiclesSchema = z.array(vehiclesItemSchema).meta({
  id: 'https://salvageunion.com/schemas/vehicles.schema.json',
  title: 'vehicles',
  description: 'Conventional vehicles in Salvage Union',
})
