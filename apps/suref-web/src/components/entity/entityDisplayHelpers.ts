import type {
  SURefMetaEntity,
  SURefEnumSchemaName,
  SURefObjectBonusPerTechLevel,
  SURefObjectSystemModule,
  SURefEnumSource,
} from 'salvageunion-reference'
import {
  getBlackMarket,
  isHybridClass,
  isSystemModule,
  getEntityNameFromSystemModule,
  extractVisibleActions,
} from 'salvageunion-reference'

/**
 * Local type that extends SURefEnumSchemaName to include meta schemas like 'actions'
 */
type SURefMetaSchemaName = SURefEnumSchemaName | 'actions'

/**
 * Get activation currency based on schema name
 */
export function getActivationCurrency(
  schemaName: SURefMetaSchemaName | undefined,
  variable: boolean = false
): 'AP' | 'EP' | 'XP' {
  if (variable) return 'XP'
  if (schemaName === 'systems' || schemaName === 'modules') {
    return 'EP'
  }
  return 'AP'
}

export function extractName(
  data: SURefMetaEntity | SURefObjectBonusPerTechLevel,
  schemaName: SURefEnumSchemaName
): string {
  if (!('name' in data)) {
    return ''
  }

  if (schemaName === 'ability-tree-requirements') {
    return data.name + ' Tree Requirements'
  }
  return data.name ?? ''
}

/**
 * Calculate background color for entity display based on schema, tech level, and entity data
 */
export function calculateBackgroundColor(
  schemaName: SURefMetaSchemaName,
  headerColor: string = '',
  techLevel: number | undefined,
  data: SURefMetaEntity | SURefObjectBonusPerTechLevel,
  techLevelColors: Record<number, string>
): string {
  // Check for Black Market items first - they get dark grey background
  if (
    'id' in data &&
    'name' in data &&
    'source' in data &&
    'page' in data &&
    getBlackMarket(data) === true
  ) {
    return 'su.darkGrey'
  }

  if (schemaName === 'chassis') return 'su.green'
  if (schemaName === 'crawlers') return headerColor || 'su.pink'
  if (schemaName === 'crawler-tech-levels') return headerColor || 'su.pink'
  if (schemaName === 'crawler-bays') return headerColor || 'su.pink'
  if (schemaName === 'creatures') return headerColor || 'su.orange'
  if (schemaName === 'bio-titans') return headerColor || 'su.orange'
  if (schemaName === 'keywords') return headerColor || 'su.orange'
  if (schemaName === 'traits') return headerColor || 'su.orange'
  if (schemaName === 'roll-tables') return headerColor || 'su.orange'
  if (schemaName === 'classes' && !headerColor) {
    // Base class (hybrid is false or missing) -> pilot orange
    // Hybrid class -> legendary color (pink)
    // Check if data is a valid entity (not SURefObjectBonusPerTechLevel)
    if ('id' in data && 'name' in data && 'source' in data && 'page' in data) {
      const isHybrid = isHybridClass(data as SURefMetaEntity)
      return isHybrid ? 'su.pink' : 'su.orange'
    }
    return 'su.orange'
  }
  if (schemaName === 'classes') return headerColor || 'su.orange'

  if (schemaName === 'abilities' && !headerColor) {
    const isLegendary =
      ('level' in data && String(data.level).toUpperCase() === 'L') ||
      ('tree' in data && String(data.tree).includes('Legendary'))
    const isAdvancedOrHybrid =
      'tree' in data &&
      (String(data.tree).includes('Advanced') || String(data.tree).includes('Hybrid'))

    if (isLegendary) {
      return 'su.pink'
    } else if (isAdvancedOrHybrid) {
      return 'su.darkOrange'
    } else {
      return 'su.orange'
    }
  }

  if (schemaName === 'ability-tree-requirements' && !headerColor) {
    const name = 'name' in data ? String(data.name).toLowerCase() : ''
    if (name.includes('legendary')) {
      return 'su.pink'
    } else if (name.includes('advanced') || name.includes('hybrid')) {
      return 'brand.srd'
    }
    return 'su.orange'
  }

  if (headerColor) return headerColor
  if (techLevel) return techLevelColors[techLevel] ?? 'su.orange'
  return 'su.orange'
}

/**
 * Get background color for content area based on schema
 */
export function getContentBackground(schemaName: SURefMetaSchemaName): string {
  return schemaName === 'actions' ? 'su.blue' : 'su.lightBlue'
}

/**
 * Calculate opacity values for entity display
 */
export function calculateOpacity(dimHeader: boolean, disabled: boolean) {
  return {
    header: dimHeader ? 0.5 : 1,
    content: disabled ? 0.5 : 1,
  }
}

/**
 * Determine which action to take when header is clicked
 * Priority order:
 * 1. If there's a button config and it's collapsible, toggle
 * 2. If there's an onClick handler and not disabled, call it
 * 3. If collapsible, toggle
 */
export function createHeaderClickHandler(
  hasButtonConfig: boolean,
  collapsible: boolean,
  onClick: (() => void) | undefined,
  disabled: boolean,
  onToggle: () => void
): () => void {
  return () => {
    if (hasButtonConfig && collapsible) {
      onToggle()
      return
    }

    if (onClick && !disabled) {
      onClick()
      return
    }

    if (collapsible) {
      onToggle()
    }
  }
}

/**
 * Determine if extra content should be shown based on compact mode and hideActions flag
 * In compact mode, only show extra sections if actions are not hidden
 * In normal mode, always show extra sections
 */
export function shouldShowExtraContent(compact: boolean, hideActions: boolean): boolean {
  return compact ? !hideActions : true
}

/**
 * Get entity display name with fallback to title
 * Consolidates entity name extraction logic from multiple components
 * @param data - The entity data
 * @param title - Optional title to use as fallback
 * @returns The entity display name
 */
export function getEntityDisplayName(data: SURefMetaEntity, title?: string): string {
  return title || ('name' in data ? String(data.name) : '')
}

/**
 * Resolve entity name from various entity types
 * Handles regular entities, system modules, and custom system options
 * @param entity - The entity (can be SURefMetaEntity or SURefObjectSystemModule)
 * @param title - Optional title to use as fallback
 * @returns The resolved entity name or undefined
 */
export function resolveEntityName(
  entity: SURefMetaEntity | SURefObjectSystemModule,
  title?: string
): string | undefined {
  // If we have a title, use it
  if (title) {
    return title
  }

  // Check if entity has a name property
  if ('name' in entity && typeof entity.name === 'string') {
    return entity.name
  }

  // Check if entity has a value property (for custom system options)
  if ('value' in entity && typeof entity.value === 'string') {
    return entity.value
  }

  // Check if entity is a system module
  if (isSystemModule(entity as SURefMetaEntity)) {
    return getEntityNameFromSystemModule(entity as SURefObjectSystemModule)
  }

  // Try to get name from visible actions (fallback for entities without direct name)
  const visibleActions = extractVisibleActions(entity as SURefMetaEntity)
  if (visibleActions && visibleActions.length > 0) {
    return visibleActions[0]?.name
  }

  return undefined
}

/**
 * Get source-specific CSS styles for entity headers and footers
 * @param source - The source book name
 * @param disabled - Whether the entity is disabled
 * @param compact - Whether compact mode is enabled (disables visual effects like jagged borders)
 * @param variant - Whether this is for 'header' (bottom jagged) or 'footer' (top jagged)
 * @returns CSS styles object or empty object
 */
export function getSourceStyles(
  source: SURefEnumSource | undefined,
  disabled: boolean = false,
  compact: boolean = false,
  variant: 'header' | 'footer' = 'header'
): Record<string, unknown> {
  if (!source || disabled) return {}

  switch (source) {
    case 'We Were Here First!': {
      // Jagged clipPath using percentage-based values that scale with element size
      // Header: jagged bottom edge only
      // Footer: jagged top edge only
      const baseStyles = {
        position: 'relative' as const,
      }

      if (variant === 'header') {
        // Header: use ::after pseudo-element to extend jagged teeth below the header
        // Maximum dramatic spikes (0-100% range) with reduced height (5px)
        return {
          ...baseStyles,
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '5px',
            background: 'inherit',
            clipPath: `polygon(
              0% 0%,
              100% 0%,
              100% 100%,
              98.5% 100%, 98% 22%, 97.5% 78%, 97% 20%, 96.5% 80%, 96% 24%,
              95% 100%, 94.5% 20%, 94% 80%, 93.5% 23%, 93% 77%, 92.5% 28%,
              91.5% 100%, 91% 20%, 90.5% 80%, 90% 27%, 89.5% 73%, 89% 100%,
              88% 100%, 87.5% 20%, 87% 80%, 86.5% 31%, 86% 75%, 85.5% 100%,
              84.5% 100%, 84% 22%, 83.5% 78%, 83% 34%, 82.5% 78%, 82% 100%,
              81% 100%, 80.5% 20%, 80% 80%, 79.5% 23%, 79% 77%, 78.5% 100%,
              77.5% 100%, 77% 20%, 76.5% 80%, 76% 37%, 75.5% 70%, 75% 100%,
              74% 100%, 73.5% 20%, 73% 78%, 72.5% 39%, 72% 73%, 71.5% 100%,
              70.5% 100%, 70% 23%, 69.5% 80%, 69% 28%, 68.5% 78%, 68% 100%,
              67% 100%, 66.5% 20%, 66% 80%, 65.5% 41%, 65% 70%, 64.5% 100%,
              63.5% 100%, 63% 25%, 62.5% 80%, 62% 44%, 61.5% 77%, 61% 100%,
              60% 100%, 59.5% 20%, 59% 80%, 58.5% 47%, 58% 66%, 57.5% 100%,
              56.5% 100%, 56% 30%, 55.5% 78%, 55% 51%, 54.5% 73%, 54% 100%,
              53% 100%, 52.5% 20%, 52% 80%, 51.5% 36%, 51% 78%, 50.5% 100%,
              49.5% 100%, 49% 20%, 48.5% 80%, 48% 55%, 47.5% 62%, 47% 100%,
              46% 100%, 45.5% 33%, 45% 80%, 44.5% 42%, 44% 77%, 43.5% 100%,
              42.5% 100%, 42% 22%, 41.5% 78%, 41% 59%, 40.5% 58%, 40% 100%,
              39% 100%, 38.5% 20%, 38% 80%, 37.5% 38%, 37% 74%, 36.5% 100%,
              35.5% 100%, 35% 27%, 34.5% 80%, 34% 50%, 33.5% 78%, 33% 100%,
              32% 100%, 31.5% 20%, 31% 80%, 30.5% 62%, 30% 63%, 29.5% 100%,
              28.5% 100%, 28% 24%, 27.5% 80%, 27% 46%, 26.5% 76%, 26% 100%,
              25% 100%, 24.5% 20%, 24% 80%, 23.5% 54%, 23% 69%, 22.5% 100%,
              21.5% 100%, 21% 31%, 20.5% 80%, 20% 40%, 19.5% 77%, 19% 100%,
              18% 100%, 17.5% 20%, 17% 80%, 16.5% 58%, 16% 60%, 15.5% 100%,
              14.5% 100%, 14% 35%, 13.5% 80%, 13% 52%, 12.5% 73%, 12% 100%,
              11% 100%, 10.5% 22%, 10% 78%, 9.5% 43%, 9% 78%, 8.5% 100%,
              7.5% 100%, 7% 26%, 6.5% 80%, 6% 60%, 5.5% 62%, 5% 100%,
              4% 100%, 3.5% 20%, 3% 80%, 2.5% 49%, 2% 75%, 1.5% 100%,
              1% 29%, 0.5% 80%, 0% 39%
            )`,
            transform: 'translateY(100%)',
            pointerEvents: 'none',
          },
        }
      } else {
        // Footer: use ::before pseudo-element to extend jagged teeth above the footer
        // Maximum dramatic spikes (0-100% range) with reduced height (5px)
        return {
          ...baseStyles,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '5px',
            background: 'inherit',
            clipPath: `polygon(
              0% 0%,
              0.5% 82%, 1% 15%, 1.5% 85%, 2% 20%, 2.5% 80%, 3% 0%,
              3.5% 78%, 4% 18%, 4.5% 85%, 5% 25%, 5.5% 75%, 6% 0%,
              6.5% 70%, 7% 15%, 7.5% 85%, 8% 30%, 8.5% 65%, 9% 0%,
              9.5% 60%, 10% 15%, 10.5% 85%, 11% 35%, 11.5% 55%, 12% 0%,
              12.5% 50%, 13% 15%, 13.5% 85%, 14% 40%, 14.5% 45%, 15% 0%,
              15.5% 83%, 16% 18%, 16.5% 85%, 17% 45%, 17.5% 38%, 18% 0%,
              18.5% 80%, 19% 15%, 19.5% 85%, 20% 33%, 20.5% 68%, 21% 0%,
              21.5% 72%, 22% 23%, 22.5% 83%, 23% 48%, 23.5% 58%, 24% 0%,
              24.5% 63%, 25% 15%, 25.5% 85%, 26% 38%, 26.5% 52%, 27% 0%,
              27.5% 47%, 28% 19%, 28.5% 83%, 29% 53%, 29.5% 42%, 30% 0%,
              30.5% 77%, 31% 15%, 31.5% 85%, 32% 42%, 32.5% 33%, 33% 0%,
              33.5% 66%, 34% 15%, 34.5% 85%, 35% 27%, 35.5% 73%, 36% 0%,
              36.5% 57%, 37% 21%, 37.5% 82%, 38% 50%, 38.5% 48%, 39% 0%,
              39.5% 78%, 40% 15%, 40.5% 85%, 41% 37%, 41.5% 62%, 42% 0%,
              42.5% 54%, 43% 18%, 43.5% 85%, 44% 46%, 44.5% 53%, 45% 0%,
              45.5% 69%, 46% 24%, 46.5% 80%, 47% 51%, 47.5% 44%, 48% 0%,
              48.5% 74%, 49% 15%, 49.5% 85%, 50% 31%, 50.5% 78%, 51% 0%,
              51.5% 59%, 52% 18%, 52.5% 82%, 53% 50%, 53.5% 39%, 54% 0%,
              54.5% 64%, 55% 15%, 55.5% 85%, 56% 41%, 56.5% 71%, 57% 0%,
              57.5% 49%, 58% 22%, 58.5% 81%, 59% 59%, 59.5% 36%, 60% 0%,
              60.5% 61%, 61% 15%, 61.5% 85%, 62% 36%, 62.5% 76%, 63% 0%,
              63.5% 67%, 64% 20%, 64.5% 83%, 65% 61%, 65.5% 34%, 66% 0%,
              66.5% 51%, 67% 15%, 67.5% 85%, 68% 49%, 68.5% 81%, 69% 0%,
              69.5% 56%, 70% 26%, 70.5% 79%, 71% 64%, 71.5% 27%, 72% 0%,
              72.5% 72%, 73% 15%, 73.5% 85%, 74% 43%, 74.5% 65%, 75% 0%,
              75.5% 47%, 76% 18%, 76.5% 83%, 77% 57%, 77.5% 43%, 78% 0%,
              78.5% 63%, 79% 29%, 79.5% 82%, 80% 53%, 80.5% 32%, 81% 0%,
              81.5% 70%, 82% 15%, 82.5% 85%, 83% 46%, 83.5% 78%, 84% 0%,
              84.5% 55%, 85% 23%, 85.5% 83%, 86% 62%, 86.5% 29%, 87% 0%,
              87.5% 66%, 88% 15%, 88.5% 85%, 89% 40%, 89.5% 73%, 90% 0%,
              90.5% 61%, 91% 18%, 91.5% 81%, 92% 58%, 92.5% 46%, 93% 0%,
              93.5% 74%, 94% 31%, 94.5% 85%, 95% 54%, 95.5% 37%, 96% 0%,
              96.5% 68%, 97% 15%, 97.5% 85%, 98% 47%, 98.5% 79%, 99% 0%,
              99.5% 58%, 100% 20%,
              100% 100%,
              0% 100%
            )`,
            transform: 'translateY(-100%)',
            pointerEvents: 'none',
          },
        }
      }
    }
    case 'False Flag': {
      // Thin vertical white lines
      return {
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 3px,
          rgba(255, 255, 255, 0.4) 3px,
          rgba(255, 255, 255, 0.4) 4px
        )`,
        backgroundSize: '6px 100%',
        backgroundPosition: '0 0',
      }
    }
    case 'Rainmaker': {
      // Dramatically increased saturation + static rain effect
      return {
        filter: 'saturate(2.5)',
        position: 'relative' as const,
        backgroundImage: `repeating-linear-gradient(
          90deg,
          transparent,
          transparent 1px,
          rgba(255, 255, 255, 0.5) 1px,
          rgba(255, 255, 255, 0.5) 2px
        )`,
        backgroundSize: '3px 100%',
      }
    }
    default:
      return {}
  }
}
