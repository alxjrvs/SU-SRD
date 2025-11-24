/**
 * Requirements for ability trees in Salvage Union
 * Converted from schemas/ability-tree-requirements.schema.json
 */

import { z } from 'zod'
import * as enums from './shared/enums.js'
import * as objects from './shared/objects.js'

/**
 * Ability-tree-requirements item schema
 */
export const abilityTreeRequirementsItemSchema = objects.baseEntity
  .extend({
    requirement: z
      .array(enums.tree)
      .describe('List of ability tree names required to access this tree'),
  })
  .strict()

/**
 * Ability-tree-requirements array schema
 */
export const abilityTreeRequirementsSchema = z.array(abilityTreeRequirementsItemSchema).meta({
  id: 'https://salvageunion.com/schemas/ability-tree-requirements.schema.json',
  title: 'ability-tree-requirements',
  description: 'Requirements for ability trees in Salvage Union',
})
