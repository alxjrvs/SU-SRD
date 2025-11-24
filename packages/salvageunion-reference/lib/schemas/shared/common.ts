/**
 * Shared common type definitions for Salvage Union game data
 * Converted from shared/common.schema.json
 */

import { z } from 'zod'

/**
 * Non-negative integer (0 or greater)
 */
export const nonNegativeInteger = z
  .number()
  .int()
  .min(0)
  .describe('Non-negative integer (0 or greater)')
  .meta({
    title: 'Non-negative Integer',
    description: 'Non-negative integer (0 or greater)',
  })

/**
 * Positive integer (1 or greater)
 */
export const positiveInteger = z
  .number()
  .int()
  .min(1)
  .describe('Positive integer (1 or greater)')
  .meta({
    title: 'Positive Integer',
    description: 'Positive integer (1 or greater)',
  })

/**
 * Unique identifier for the entry
 */
export const id = z.string().describe('Unique identifier for the entry').meta({
  title: 'ID',
  description: 'Unique identifier for the entry',
})

/**
 * URL to an image asset for this entry
 */
export const asset_url = z.string().url().describe('URL to an image asset for this entry').meta({
  title: 'Asset URL',
  description: 'URL to an image asset for this entry',
})

/**
 * Cost in ability points to activate an ability
 * Can be a non-negative integer or the string "X"
 */
export const activationCost = z
  .union([nonNegativeInteger, z.literal('X')])
  .describe('Cost in ability points to activate an ability')
  .meta({
    title: 'Activation Cost',
    description: 'Cost in ability points to activate an ability',
  })

/**
 * Name of the entry
 */
export const name = z.string().min(1).describe('Name of the entry').meta({
  title: 'Name',
  description: 'Name of the entry',
})

/**
 * Technology level of the item or entity (number, 'B' for Bio, or 'N' for Nanite)
 */
export const techLevel = z
  .union([
    z.number().int().min(0),
    z.literal('B').describe('Bio tech level (treated as 1 in calculations)'),
    z.literal('N').describe('Nanite tech level (treated as 1 in calculations)'),
  ])
  .describe("Technology level of the item or entity (number, 'B' for Bio, or 'N' for Nanite)")
  .meta({
    title: 'Tech Level',
    description: "Technology level of the item or entity (number, 'B' for Bio, or 'N' for Nanite)",
  })

/**
 * Salvage value in credits
 */
export const salvageValue = nonNegativeInteger.describe('Salvage value in credits').meta({
  title: 'Salvage Value',
  description: 'Salvage value in credits',
})

/**
 * Hit points for creatures and personnel
 */
export const hitPoints = nonNegativeInteger
  .describe('Hit points for creatures and personnel')
  .meta({
    title: 'Hit Points',
    description: 'Hit points for creatures and personnel',
  })

/**
 * Structure points for mechs, vehicles, and titans
 */
export const structurePoints = positiveInteger
  .describe('Structure points for mechs, vehicles, and titans')
  .meta({
    title: 'Structure Points',
    description: 'Structure points for mechs, vehicles, and titans',
  })
