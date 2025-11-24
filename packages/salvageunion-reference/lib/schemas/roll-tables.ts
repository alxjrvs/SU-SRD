/**
 * Random tables and roll tables in Salvage Union
 * Converted from schemas/roll-tables.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Roll-tables item schema
 */
export const rollTablesItemSchema = objects.baseEntity
  .extend({
    section: z.string().describe('Section or category of the roll table'),
    table: objects.table,
    content: objects.content.optional(),
  })
  .strict()

/**
 * Roll-tables array schema
 */
export const rollTablesSchema = z.array(rollTablesItemSchema).meta({
  id: 'https://salvageunion.com/schemas/roll-tables.schema.json',
  title: 'roll-tables',
  description: 'Random tables and roll tables in Salvage Union',
})
