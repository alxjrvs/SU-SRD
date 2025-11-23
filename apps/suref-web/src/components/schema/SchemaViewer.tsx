import { Box, Flex, Text, Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { ReferenceHeader } from '@/components/shared/ReferenceHeader'
import Footer from '@/components/Footer'
import type { SchemaInfo } from '@/types/schema'
import { useSchemaData } from './useSchemaData'
import { useSchemaId } from '@/hooks/useSchemaParams'
import { useMemo, Suspense } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/schema/$schemaId/index'
import { getDisplayComponent } from '@/components/componentRegistry'
import type { SURefEntity } from 'salvageunion-reference'
import { getTechLevelNumber } from 'salvageunion-reference'
import { getEntitySlug } from '@/utils/slug'

interface SchemaViewerProps {
  schemas: SchemaInfo[]
  data?: SURefEntity[]
}

export default function SchemaViewer({ schemas, data: prefetchedData }: SchemaViewerProps) {
  const schemaId = useSchemaId()
  const { data: fetchedData, loading, error } = useSchemaData(schemaId)
  const navigate = useNavigate({ from: Route.fullPath })

  const data = prefetchedData ?? fetchedData

  const { search = '', tl = [], source = [] } = Route.useSearch()

  const techLevelFilters = useMemo(() => new Set(tl.map(String)), [tl])
  const sourceFilters = useMemo(() => new Set(source), [source])

  const currentSchema = schemas.find((s) => s.id === schemaId)

  const techLevels = useMemo(() => {
    const levels = new Set<number>()
    data.forEach((item) => {
      const techLevel = getTechLevelNumber(item)
      if (techLevel !== undefined) {
        levels.add(techLevel)
      }
    })
    return Array.from(levels).sort()
  }, [data])

  const sources = useMemo(() => {
    const sourceSet = new Set<string>()
    data.forEach((item) => {
      if ('source' in item && typeof item.source === 'string') {
        sourceSet.add(item.source)
      }
    })
    return Array.from(sourceSet).sort()
  }, [data])

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (search) {
        const searchLower = search.toLowerCase()
        const nameMatch =
          'name' in item && item.name?.toString().toLowerCase().includes(searchLower)
        const descMatch =
          'description' in item && item.description?.toString().toLowerCase().includes(searchLower)
        if (!nameMatch && !descMatch) return false
      }

      if (techLevelFilters.size > 0) {
        const techLevel = getTechLevelNumber(item)
        const itemTechLevel = techLevel?.toString()
        if (!itemTechLevel || !techLevelFilters.has(itemTechLevel)) {
          return false
        }
      }

      if (sourceFilters.size > 0) {
        const itemSource = 'source' in item && typeof item.source === 'string' ? item.source : null
        if (!itemSource || !sourceFilters.has(itemSource)) {
          return false
        }
      }

      return true
    })
  }, [data, search, techLevelFilters, sourceFilters])

  const DisplayComponent = useMemo(() => getDisplayComponent(schemaId), [schemaId])

  if (loading) {
    return (
      <Flex alignItems="center" justifyContent="center" h="90vh">
        <Text fontSize="xl">Loading data...</Text>
      </Flex>
    )
  }

  if (error || !currentSchema) {
    return (
      <Flex alignItems="center" justifyContent="center" h="full">
        <Text fontSize="xl" color="red.600">
          Error: {error || 'Schema not found'}
        </Text>
      </Flex>
    )
  }

  if (!DisplayComponent) {
    return (
      <Flex alignItems="center" justifyContent="center" h="full">
        <Text fontSize="xl" color="red.600">
          No display component found for schema: {schemaId}
        </Text>
      </Flex>
    )
  }

  const capitalizedTitle =
    currentSchema.displayNamePlural ||
    currentSchema.title.charAt(0).toUpperCase() + currentSchema.title.slice(1)

  const hasFilters = techLevels.length > 1 || sources.length > 1

  return (
    <Flex flexDirection="column" minH="100%">
      <ReferenceHeader title={capitalizedTitle} textAlign="center" py={hasFilters ? 6 : 4} px={6}>
        <Box maxW="800px" mx="auto" w="full">
          <Text color="su.black" textAlign="center" mb={hasFilters ? 3 : 2}>
            {currentSchema.description}
          </Text>
        </Box>

        <Box mb={hasFilters ? 3 : 2} w="full" maxW="600px" mx="auto">
          <Input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => {
              navigate({
                search: (prev) => ({ ...prev, search: e.target.value || undefined }),
                replace: true,
              })
            }}
            borderColor="border.default"
            focusRingColor="su.orange"
            bg="su.white"
            color="fg.input"
            w="full"
          />
        </Box>

        {hasFilters && (
          <Flex flexDirection="column" gap={3} w="full" maxW="1200px" mx="auto">
            {techLevels.length > 1 && (
              <Flex flexWrap="wrap" gap={2}>
                <Button
                  onClick={() => {
                    navigate({
                      search: (prev) => ({ ...prev, tl: undefined }),
                    })
                  }}
                  px={4}
                  py={2}
                  fontWeight="medium"
                  bg={techLevelFilters.size === 0 ? 'su.orange' : 'bg.surface'}
                  color={techLevelFilters.size === 0 ? 'su.white' : 'fg.default'}
                  borderWidth={techLevelFilters.size === 0 ? '0' : '1px'}
                  borderColor="border.default"
                  _hover={techLevelFilters.size === 0 ? {} : { bg: 'bg.hover' }}
                >
                  All
                </Button>
                {techLevels.map((level) => {
                  const isSelected = techLevelFilters.has(String(level))
                  return (
                    <Button
                      key={level}
                      onClick={() => {
                        navigate({
                          search: (prev) => ({
                            ...prev,
                            tl: prev.tl?.includes(level)
                              ? prev.tl.filter((l) => l !== level)
                              : [...(prev.tl || []), level],
                          }),
                        })
                      }}
                      px={4}
                      py={2}
                      fontWeight="medium"
                      bg={isSelected ? 'su.orange' : 'bg.surface'}
                      color={isSelected ? 'su.white' : 'fg.default'}
                      borderWidth={isSelected ? '0' : '1px'}
                      borderColor="border.default"
                      _hover={isSelected ? {} : { bg: 'bg.hover' }}
                    >
                      T{level}
                    </Button>
                  )
                })}
              </Flex>
            )}

            {sources.length > 1 && (
              <Flex flexWrap="wrap" gap={2}>
                <Button
                  onClick={() => {
                    navigate({
                      search: (prev) => ({ ...prev, source: undefined }),
                    })
                  }}
                  px={4}
                  py={2}
                  fontWeight="medium"
                  bg={sourceFilters.size === 0 ? 'su.orange' : 'bg.surface'}
                  color={sourceFilters.size === 0 ? 'su.white' : 'fg.default'}
                  borderWidth={sourceFilters.size === 0 ? '0' : '1px'}
                  borderColor="border.default"
                  _hover={sourceFilters.size === 0 ? {} : { bg: 'bg.hover' }}
                >
                  All
                </Button>
                {sources.map((source) => {
                  const isSelected = sourceFilters.has(source)
                  return (
                    <Button
                      key={source}
                      onClick={() => {
                        navigate({
                          search: (prev) => ({
                            ...prev,
                            source: prev.source?.includes(source)
                              ? prev.source.filter((s) => s !== source)
                              : [...(prev.source || []), source],
                          }),
                        })
                      }}
                      px={4}
                      py={2}
                      fontWeight="medium"
                      bg={isSelected ? 'su.orange' : 'bg.surface'}
                      color={isSelected ? 'su.white' : 'fg.default'}
                      borderWidth={isSelected ? '0' : '1px'}
                      borderColor="border.default"
                      _hover={isSelected ? {} : { bg: 'bg.hover' }}
                    >
                      {source}
                    </Button>
                  )
                })}
              </Flex>
            )}
          </Flex>
        )}
      </ReferenceHeader>

      <Box flex="1" p={6} bg="bg.landing">
        <Box
          maxW="1400px"
          mx="auto"
          css={{
            columnCount: { base: 1, md: 2, lg: 3 },
            columnGap: '1rem',
            '& > *': {
              breakInside: 'avoid',
              marginBottom: '1rem',
            },
          }}
        >
          {filteredData.map((item: SURefEntity) => (
            <Box
              key={item.id}
              cursor="pointer"
              transition="all 0.2s ease-in-out"
              _hover={{
                transform: { base: 'none', md: 'scale(1.05) translateY(-4px)' },
                zIndex: { base: 'auto', md: 10 },
                boxShadow: { base: 'none', md: '0 8px 16px rgba(0, 0, 0, 0.2)' },
              }}
              onClick={() =>
                navigate({
                  to: '/schema/$schemaId/item/$itemId',
                  params: { schemaId, itemId: getEntitySlug(item) },
                })
              }
            >
              <Suspense fallback={<Box h="200px" bg="su.lightBlue" borderRadius="md" />}>
                <DisplayComponent
                  hideActions
                  hideChoices
                  data={item}
                  compact={true}
                  collapsible={false}
                />
              </Suspense>
            </Box>
          ))}
        </Box>
      </Box>
      <Footer />
    </Flex>
  )
}
