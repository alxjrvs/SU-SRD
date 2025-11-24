/**
 * Character classes in Salvage Union (base, advanced, and hybrid)
 * Converted from schemas/classes.schema.json
 */

import { z } from 'zod'
import * as enums from './shared/enums.js'
import * as objects from './shared/objects.js'

/**
 * Base class schema
 */
const baseClassSchema = objects.baseEntity
  .extend({
    maxAbilities: z
      .number()
      .int()
      .min(1)
      .describe('Maximum number of abilities this class can have'),
    advanceable: z.boolean().describe('Whether this class can advance to hybrid classes'),
    coreTrees: z.array(enums.tree).describe('Core ability trees available to this class'),
    advancedTree: enums.tree
      .optional()
      .describe('Advanced ability tree for this class (only for advanceable base classes)'),
    legendaryTree: enums.tree
      .optional()
      .describe('Legendary ability tree for this class (only for advanceable base classes)'),
    content: objects.content.optional(),
  })
  .strict()

/**
 * Classes item schema (union of base class or advanced class)
 */
export const classesItemSchema = z.union([baseClassSchema, objects.advancedClass])

/**
 * Classes array schema
 */
export const classesSchema = z.array(classesItemSchema).meta({
  id: 'https://salvageunion.com/schemas/classes.schema.json',
  title: 'classes',
  description: 'Character classes in Salvage Union (base, advanced, and hybrid)',
})
