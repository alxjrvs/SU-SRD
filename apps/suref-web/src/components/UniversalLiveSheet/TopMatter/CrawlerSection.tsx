import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Text } from '../../base/Text'
import { StatDisplay } from '../../StatDisplay'
import { AddStatButton } from '../../shared/AddStatButton'
import { SheetSelect } from '../../shared/SheetSelect'
import { useHydratedCrawler, useCreateCrawler, useAvailableCrawlers } from '../../../hooks/crawler'
import { useUpdatePilot } from '../../../hooks/pilot'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import { supabase } from '../../../lib/supabase'
import type { Tables } from '../../../types/database-generated.types'

type Pilot = Tables<'pilots'>

interface CrawlerSectionProps {
  pilotId: string
  isEditable: boolean
  isLocal: boolean
}

export function CrawlerSection({ pilotId, isEditable, isLocal }: CrawlerSectionProps) {
  const { userId } = useCurrentUser()
  const { data: availableCrawlers = [], isLoading: loadingCrawlers } = useAvailableCrawlers()
  const createCrawler = useCreateCrawler()
  const updatePilot = useUpdatePilot()

  const { data: pilot } = useQuery({
    queryKey: ['pilot', pilotId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pilots')
        .select('crawler_id')
        .eq('id', pilotId)
        .single()

      if (error) throw error
      return (data as Pick<Pilot, 'crawler_id'> | null) ?? null
    },
    enabled: !!pilotId,
  })

  const handleCreateCrawler = async () => {
    if (!userId) return

    const newCrawler = await createCrawler.mutateAsync({
      name: 'New Crawler',
      active: false,
      private: true,
      user_id: userId,
    })

    updatePilot.mutate({
      id: pilotId,
      updates: { crawler_id: newCrawler.id },
    })
  }

  const handleCrawlerChange = (crawlerId: string | null) => {
    updatePilot.mutate({
      id: pilotId,
      updates: { crawler_id: crawlerId },
    })
  }

  if (!pilot?.crawler_id) {
    const unassignedCrawlers = availableCrawlers.filter((c) => c.id !== pilot?.crawler_id)

    return (
      <Box
        w="full"
        p={4}
        borderWidth="2px"
        borderColor="border.default"
        borderRadius="md"
        bg="su.grey"
      >
        <VStack gap={4}>
          <Text variant="pseudoheader" textAlign="center">
            No crawler assigned
          </Text>
          {!isLocal && isEditable && (
            <HStack gap={4} justify="center">
              <AddStatButton
                label="Create"
                bottomLabel="Crawler"
                onClick={handleCreateCrawler}
                disabled={createCrawler.isPending}
                ariaLabel="Create new crawler for this pilot"
              />
              {unassignedCrawlers.length > 0 && (
                <Box w="300px">
                  <SheetSelect
                    label="Or Assign Existing"
                    value={null}
                    options={unassignedCrawlers.map((c) => ({ id: c.id, name: c.name }))}
                    onChange={handleCrawlerChange}
                    placeholder="Select a crawler..."
                    loading={loadingCrawlers}
                  />
                </Box>
              )}
            </HStack>
          )}
        </VStack>
      </Box>
    )
  }

  return <CrawlerDisplay crawlerId={pilot.crawler_id} />
}

interface CrawlerDisplayProps {
  crawlerId: string
}

function CrawlerDisplay({ crawlerId }: CrawlerDisplayProps) {
  const { crawler, maxSP, selectedCrawlerType } = useHydratedCrawler(crawlerId)

  const currentSP = maxSP - (crawler?.current_damage ?? 0)
  const techLevel = crawler?.tech_level ?? 1

  return (
    <Box
      w="full"
      p={4}
      borderWidth="2px"
      borderColor="border.default"
      borderRadius="md"
      bg="su.pink"
    >
      <Flex
        gap={4}
        direction={{ base: 'column', lg: 'row' }}
        alignItems={{ base: 'flex-start', lg: 'center' }}
        justifyContent="space-between"
      >
        <HStack gap={4} alignItems="center">
          <Text variant="pseudoheader" fontSize="lg">
            {crawler?.name || 'Unnamed Crawler'}
          </Text>
          <Text fontSize="md">|</Text>
          <StatDisplay
            label="tech"
            bottomLabel="Level"
            value={techLevel}
            disabled={!selectedCrawlerType}
          />
        </HStack>

        <HStack gap={4} alignItems="center">
          <Text variant="pseudoheader" fontSize="sm">
            Structure:
          </Text>
          <Text fontSize="md">
            {currentSP}/{maxSP}
          </Text>
        </HStack>
      </Flex>
    </Box>
  )
}
