/**
 * Test that strict() catches extra properties (equivalent to unevaluatedProperties: false)
 */

import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { abilitiesSchema } from './schemas/abilities.js'
import { chassisSchema } from './schemas/chassis.js'
import { equipmentSchema } from './schemas/equipment.js'

describe('Extra Properties Validation', () => {
  describe('Abilities', () => {
    it('should reject abilities with extra properties', () => {
      const invalidData = [
        {
          id: 'test-id',
          name: 'Test Ability',
          source: 'Salvage Union Workshop Manual',
          page: 1,
          tree: 'Generic',
          level: 1,
          actions: ['Test Ability'],
          invalidProperty: 'This should not be allowed', // Extra property
        },
      ]

      const result = abilitiesSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0)
        // Zod will report the extra property in the error
        const hasExtraPropertyError = result.error.issues.some(
          (error: z.ZodIssue) =>
            error.code === 'unrecognized_keys' || error.message.includes('invalidProperty')
        )
        expect(hasExtraPropertyError).toBe(true)
      }
    })

    it('should accept valid abilities without extra properties', () => {
      const validData = [
        {
          id: 'test-id',
          name: 'Test Ability',
          source: 'Salvage Union Workshop Manual',
          page: 1,
          tree: 'Generic',
          level: 1,
          actions: ['Test Ability'],
        },
      ]

      const result = abilitiesSchema.safeParse(validData)

      expect(result.success).toBe(true)
    })
  })

  describe('Chassis', () => {
    it('should reject chassis with extra properties', () => {
      const invalidData = [
        {
          id: 'test-id',
          name: 'Test Chassis',
          source: 'Salvage Union Workshop Manual',
          page: 1,
          structurePoints: 10,
          energyPoints: 10,
          heatCapacity: 10,
          systemSlots: 10,
          moduleSlots: 10,
          cargoCapacity: 10,
          techLevel: 1,
          salvageValue: 1,
          chassisAbilities: [],
          patterns: [],
          extraField: 'This should not be allowed', // Extra property
        },
      ]

      const result = chassisSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0)
        const hasExtraPropertyError = result.error.issues.some(
          (error: z.ZodIssue) =>
            error.code === 'unrecognized_keys' || error.message.includes('extraField')
        )
        expect(hasExtraPropertyError).toBe(true)
      }
    })
  })

  describe('Equipment', () => {
    it('should reject equipment with extra properties', () => {
      const invalidData = [
        {
          id: 'test-id',
          name: 'Test Equipment',
          source: 'Salvage Union Workshop Manual',
          page: 1,
          techLevel: 1,
          actions: ['Test Equipment'],
          unknownField: 'This should not be allowed', // Extra property
        },
      ]

      const result = equipmentSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0)
        const hasExtraPropertyError = result.error.issues.some(
          (error: z.ZodIssue) =>
            error.code === 'unrecognized_keys' || error.message.includes('unknownField')
        )
        expect(hasExtraPropertyError).toBe(true)
      }
    })
  })
})
