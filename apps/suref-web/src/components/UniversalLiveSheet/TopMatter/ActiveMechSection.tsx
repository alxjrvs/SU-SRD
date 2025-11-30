import { Box, Flex, HStack, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getTechLevel, type SURefChassis } from 'salvageunion-reference'
import { Text } from '../../base/Text'
import { StatDisplay } from '../../StatDisplay'
import { AddStatButton } from '../../shared/AddStatButton'
import { SheetSelect } from '../../shared/SheetSelect'
import { MechResourceSteppers } from '../../MechLiveSheet/MechResourceSteppers'
import { useHydratedMech, useCreateMech, useUpdateMech } from '../../../hooks/mech'
import { useCurrentUser } from '../../../hooks/useCurrentUser'
import { supabase } from '../../../lib/supabase'
import type { Tables } from '../../../types/database-generated.types'

type Mech = Tables<'mechs'>

interface ActiveMechSectionProps {
  pilotId: string
  isEditable: boolean
  isLocal: boolean
}

export function ActiveMechSection({ pilotId, isEditable, isLocal }: ActiveMechSectionProps) {
  const { userId } = useCurrentUser()
  const createMech = useCreateMech()
  const updateMech = useUpdateMech()

  const { data: activeMech, isLoading } = useQuery({
    queryKey: ['active-mech', pilotId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mechs')
        .select('*')
        .eq('pilot_id', pilotId)
        .eq('active', true)
        .maybeSingle()

      if (error) throw error
      return (data as Mech | null) ?? null
    },
    enabled: !!pilotId && !isLocal,
  })

  // Get only inactive mechs belonging to this pilot (for assignment dropdown)
  const { data: inactiveMechs = [], isLoading: mechsLoading } = useQuery({
    queryKey: ['pilot-inactive-mechs', pilotId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mechs')
        .select('id, pattern, pilot_id, active, user_id')
        .eq('pilot_id', pilotId)
        .eq('active', false)
        .order('pattern', { ascending: true })

      if (error) throw error
      return (data || []) as Pick<Mech, 'id' | 'pattern' | 'pilot_id' | 'active' | 'user_id'>[]
    },
    enabled: !!pilotId && !isLocal,
  })

  const handleCreateMech = async () => {
    if (!userId) return

    // Set all other mechs for this pilot to inactive first
    const { data: pilotMechs } = await supabase.from('mechs').select('id').eq('pilot_id', pilotId)

    if (pilotMechs) {
      for (const mech of pilotMechs) {
        await updateMech.mutateAsync({ id: mech.id, updates: { active: false } })
      }
    }

    await createMech.mutateAsync({
      pattern: 'New Mech',
      current_damage: 0,
      current_heat: 0,
      current_ep: 0,
      user_id: userId,
      pilot_id: pilotId,
      active: true, // Set as active when created
    })
  }

  const handleAssignMech = async (mechId: string) => {
    // Set all mechs for this pilot to inactive first
    const { data: pilotMechs } = await supabase.from('mechs').select('id').eq('pilot_id', pilotId)

    if (pilotMechs) {
      for (const mech of pilotMechs) {
        await updateMech.mutateAsync({ id: mech.id, updates: { active: false } })
      }
    }

    // Set selected mech to active
    await updateMech.mutateAsync({ id: mechId, updates: { active: true } })
  }

  if (isLoading || mechsLoading) {
    return (
      <Box w="full" p={4} borderWidth="3px" borderColor="su.green" borderRadius="md" bg="su.grey">
        <Text>Loading active mech...</Text>
      </Box>
    )
  }

  if (!activeMech) {
    return (
      <Box w="full" p={4} borderWidth="3px" borderColor="su.grey" borderRadius="md" bg="su.grey">
        <VStack gap={4}>
          <Text variant="pseudoheader" textAlign="center">
            No active mech
          </Text>
          {!isLocal && isEditable && (
            <HStack gap={4} justify="center">
              <AddStatButton
                label="Create"
                bottomLabel="Mech"
                onClick={handleCreateMech}
                disabled={createMech.isPending}
                ariaLabel="Create new mech for this pilot"
              />
              {inactiveMechs.length > 0 && (
                <Box w="300px">
                  <SheetSelect
                    label="Or Assign Existing"
                    value={null}
                    options={inactiveMechs.map((m) => ({
                      id: m.id,
                      name: m.pattern || `Mech ${m.id.slice(0, 8)}`,
                    }))}
                    onChange={(mechId) => {
                      if (mechId) {
                        handleAssignMech(mechId)
                      }
                    }}
                    placeholder="Select a mech..."
                    loading={mechsLoading}
                  />
                </Box>
              )}
            </HStack>
          )}
        </VStack>
      </Box>
    )
  }

  return <ActiveMechDisplay mechId={activeMech.id} isEditable={isEditable} />
}

interface ActiveMechDisplayProps {
  mechId: string
  isEditable: boolean
}

function ActiveMechDisplay({ mechId, isEditable }: ActiveMechDisplayProps) {
  const { mech, selectedChassis } = useHydratedMech(mechId)
  const chassisRef = selectedChassis?.ref as SURefChassis | undefined
  const chassisName = chassisRef?.name
  const pattern = mech?.pattern ?? undefined

  const title = chassisName && pattern ? `"${pattern}"` : chassisName || 'Mech Chassis'
  const subtitle = pattern && chassisName ? `${chassisName} Chassis` : ''

  // Get tech level for display (preserves "B" and "N")
  const techLevelDisplay = chassisRef ? (getTechLevel(chassisRef) ?? 0) : 0
  const isBioTechLevel = techLevelDisplay === 'B'
  const isNTechLevel = techLevelDisplay === 'N'

  return (
    <Box w="full" borderWidth="3px" borderColor="su.green" borderRadius="md" p={4} bg="su.green">
      <Flex
        gap={4}
        direction={{ base: 'column', lg: 'row' }}
        alignItems={{ base: 'stretch', lg: 'stretch' }}
      >
        <VStack flex="1" gap={2} alignItems="stretch">
          <HStack gap={4} alignItems="center">
            <StatDisplay
              inverse={!isBioTechLevel && !isNTechLevel}
              bg={isBioTechLevel ? 'su.sicklyYellow' : isNTechLevel ? 'su.silver' : undefined}
              valueColor={isBioTechLevel ? 'su.black' : isNTechLevel ? 'su.black' : undefined}
              label="tech"
              bottomLabel="Level"
              value={techLevelDisplay}
              disabled={!selectedChassis}
            />
            <VStack alignItems="flex-start" gap={0}>
              <Text variant="pseudoheader" fontSize="lg">
                {title}
              </Text>
              {subtitle && (
                <Text variant="pseudoheader" fontSize="sm">
                  {subtitle}
                </Text>
              )}
            </VStack>
          </HStack>
        </VStack>

        <MechResourceSteppers id={mechId} disabled={!isEditable} incomplete={!selectedChassis} />
      </Flex>
    </Box>
  )
}
