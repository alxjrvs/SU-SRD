/**
 * Actions, abilities, and attacks that can be performed in Salvage Union
 * Converted from schemas/actions.schema.json
 */

import { z } from 'zod'
import * as objects from './shared/objects.js'

/**
 * Actions item schema
 * Extends the action definition from objects
 */
export const actionsItemSchema = objects.action
  .extend({
    displayName: z.string().optional().describe('The optional display name of the action'),
    activationCurrency: z
      .enum(['Variable', 'EP or AP', 'SP or HP'])
      .optional()
      .describe('The currency type for activation cost (EP/AP, SP/HP, or Variable)'),
  })
  .strict()

/**
 * Actions array schema
 */
export const actionsSchema = z.array(actionsItemSchema).meta({
  id: 'https://salvageunion.com/schemas/actions.schema.json',
  title: 'actions',
  description: 'Actions, abilities, and attacks that can be performed in Salvage Union',
})
