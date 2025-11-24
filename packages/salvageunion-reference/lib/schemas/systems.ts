/**
 * Mech systems in Salvage Union
 * Converted from schemas/systems.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Systems item schema
 */
export const systemsItemSchema = objects.systemModule.merge(objects.baseEntity).strict()

/**
 * Systems array schema
 */
export const systemsSchema = z.array(systemsItemSchema).meta({
  id: 'https://salvageunion.com/schemas/systems.schema.json',
  title: 'systems',
  description: 'Mech systems in Salvage Union',
})
