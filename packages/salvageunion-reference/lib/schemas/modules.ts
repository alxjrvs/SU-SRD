/**
 * Mech modules in Salvage Union
 * Converted from schemas/modules.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Modules item schema
 */
export const modulesItemSchema = objects.systemModule.merge(objects.baseEntity).strict()

/**
 * Modules array schema
 */
export const modulesSchema = z.array(modulesItemSchema).meta({
  id: 'https://salvageunion.com/schemas/modules.schema.json',
  title: 'modules',
  description: 'Mech modules in Salvage Union',
})
