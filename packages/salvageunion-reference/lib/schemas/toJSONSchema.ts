/**
 * Utility to export Zod schemas to JSON Schema format
 * Uses z.toJSONSchema() with registry support
 */

import { z } from 'zod'
import { schemaRegistry } from './registry.js'

/**
 * Options for JSON Schema export
 */
export interface ToJSONSchemaOptions {
  /**
   * The JSON Schema version to target
   * Default: "draft-2019-09" to match current JSON Schema files
   */
  target?: 'draft-4' | 'draft-7' | 'draft-2020-12' | 'openapi-3.0'
  /**
   * Whether to include $defs for shared schemas
   * Default: true
   */
  includeDefs?: boolean
}

/**
 * Convert a Zod schema to JSON Schema format
 */
export function toJSONSchema(
  schema: z.ZodSchema<unknown>,
  options: ToJSONSchemaOptions = {}
): JSONSchema {
  const { target = 'draft-2020-12', includeDefs = true } = options

  const jsonSchema = z.toJSONSchema(schema, {
    target,
    metadata: includeDefs ? schemaRegistry : undefined,
    cycles: 'ref',
    reused: includeDefs ? 'ref' : 'inline',
  })

  return jsonSchema as JSONSchema
}

/**
 * Export a schema to JSON Schema format with proper metadata
 */
export function exportSchemaToJSON(
  schema: z.ZodSchema<unknown>,
  schemaId: string,
  options: ToJSONSchemaOptions = {}
): JSONSchema {
  const jsonSchema = toJSONSchema(schema, options)

  // Add $schema and $id if not present
  if (!jsonSchema.$schema) {
    jsonSchema.$schema = 'https://json-schema.org/draft/2019-09/schema#'
  }
  if (!jsonSchema.$id && schemaId) {
    jsonSchema.$id = schemaId
  }

  return jsonSchema
}

/**
 * Type for JSON Schema (simplified)
 */
export type JSONSchema = {
  $schema?: string
  $id?: string
  type?: string | string[]
  properties?: Record<string, JSONSchema>
  required?: string[]
  items?: JSONSchema
  oneOf?: JSONSchema[]
  allOf?: JSONSchema[]
  anyOf?: JSONSchema[]
  $ref?: string
  $defs?: Record<string, JSONSchema>
  [key: string]: unknown
}
