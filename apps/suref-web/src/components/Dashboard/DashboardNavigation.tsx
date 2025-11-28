import {
  Box,
  Button,
  Flex,
  IconButton,
  HStack,
  Text,
  useBreakpointValue,
  Drawer,
  VStack,
} from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import { Link } from '@tanstack/react-router'
import { Heading } from '../base/Heading'
import { useNavigationState } from '../../hooks/useNavigationState'
import { NavigationLink } from '../shared/NavigationLink'
import { UserMenu } from '../shared/UserMenu'
import { DiscordSignInButton } from '../DiscordSignInButton'
import { UniversalSearchBar } from '../shared/UniversalSearchBar'
import type { SchemaInfo } from '../../types/schema'

interface DashboardNavigationProps {
  user: User | null
  schemas?: SchemaInfo[]
}

export function DashboardNavigation({ user, schemas = [] }: DashboardNavigationProps) {
  const { isOpen, signingOut, handleSignOut, isActive, toggleMenu } = useNavigationState()

  // Only show hamburger menu on screens smaller than lg
  const showHamburger = useBreakpointValue({ base: true, lg: false }) ?? true

  const renderNavigationContent = () => (
    <VStack gap={4} alignItems="stretch" w="full">
      <Button
        asChild
        _hover={{ bg: 'bg.hover' }}
        bg="transparent"
        borderRadius="md"
        variant="ghost"
        h="auto"
        p={2}
        color="fg.default"
        w="full"
        justifyContent="flex-start"
      >
        <Link to="/" onClick={toggleMenu}>
          <Heading level="h2">Salvage Union</Heading>
          <Text fontSize="xs" color="brand.srd">
            Dashboard
          </Text>
        </Link>
      </Button>

      <VStack as="ul" gap={2} alignItems="stretch" w="full" listStyleType="none">
        <Box as="li">
          <Button
            asChild
            px={4}
            py={2}
            _hover={{ bg: 'bg.hover' }}
            bg={isActive('/dashboard', true) ? 'bg.active' : 'transparent'}
            borderBottomWidth={isActive('/dashboard', true) ? '3px' : 0}
            borderBottomColor="su.orange"
            color="fg.default"
            fontWeight={isActive('/dashboard', true) ? 'semibold' : 'normal'}
            borderRadius="md"
            variant="ghost"
            h="auto"
            w="full"
            justifyContent="flex-start"
          >
            <Link to="/dashboard" onClick={toggleMenu}>
              Overview
            </Link>
          </Button>
        </Box>
        <Box as="li">
          <Button
            asChild
            px={4}
            py={2}
            _hover={{ bg: 'bg.hover' }}
            bg={isActive('/dashboard/games') ? 'bg.active' : 'transparent'}
            borderBottomWidth={isActive('/dashboard/games') ? '3px' : 0}
            borderBottomColor="su.orange"
            color="fg.default"
            fontWeight={isActive('/dashboard/games') ? 'semibold' : 'normal'}
            borderRadius="md"
            variant="ghost"
            h="auto"
            w="full"
            justifyContent="flex-start"
          >
            <Link to="/dashboard/games" onClick={toggleMenu}>
              Games
            </Link>
          </Button>
        </Box>
        <Box as="li">
          <Button
            asChild
            px={4}
            py={2}
            _hover={{ bg: 'bg.hover' }}
            bg={isActive('/dashboard/crawlers') ? 'bg.active' : 'transparent'}
            borderBottomWidth={isActive('/dashboard/crawlers') ? '3px' : 0}
            borderBottomColor="su.orange"
            color="fg.default"
            fontWeight={isActive('/dashboard/crawlers') ? 'semibold' : 'normal'}
            borderRadius="md"
            variant="ghost"
            h="auto"
            w="full"
            justifyContent="flex-start"
          >
            <Link to="/dashboard/crawlers" onClick={toggleMenu}>
              Crawlers
            </Link>
          </Button>
        </Box>
        <Box as="li">
          <Button
            asChild
            px={4}
            py={2}
            _hover={{ bg: 'bg.hover' }}
            bg={isActive('/dashboard/pilots') ? 'bg.active' : 'transparent'}
            borderBottomWidth={isActive('/dashboard/pilots') ? '3px' : 0}
            borderBottomColor="su.orange"
            color="fg.default"
            fontWeight={isActive('/dashboard/pilots') ? 'semibold' : 'normal'}
            borderRadius="md"
            variant="ghost"
            h="auto"
            w="full"
            justifyContent="flex-start"
          >
            <Link to="/dashboard/pilots" onClick={toggleMenu}>
              Pilots
            </Link>
          </Button>
        </Box>
        <Box as="li">
          <Button
            asChild
            px={4}
            py={2}
            _hover={{ bg: 'bg.hover' }}
            bg={isActive('/dashboard/mechs') ? 'bg.active' : 'transparent'}
            borderBottomWidth={isActive('/dashboard/mechs') ? '3px' : 0}
            borderBottomColor="su.orange"
            color="fg.default"
            fontWeight={isActive('/dashboard/mechs') ? 'semibold' : 'normal'}
            borderRadius="md"
            variant="ghost"
            h="auto"
            w="full"
            justifyContent="flex-start"
          >
            <Link to="/dashboard/mechs" onClick={toggleMenu}>
              Mechs
            </Link>
          </Button>
        </Box>
      </VStack>

      <Flex
        alignItems="center"
        gap={4}
        flexDirection="column"
        w="full"
        pt={4}
        borderTopWidth="1px"
        borderTopColor="border.default"
      >
        <UserMenu
          user={user}
          onSignOut={handleSignOut}
          signingOut={signingOut}
          signInComponent={<DiscordSignInButton px={4} py={2} fontSize="sm" w="full" />}
        />
      </Flex>
    </VStack>
  )

  return (
    <>
      {showHamburger && (
        <>
          <Flex
            position="fixed"
            top={0}
            left={0}
            right={0}
            h="80px"
            bg="su.white"
            px={6}
            py={3}
            alignItems="center"
            justifyContent="space-between"
            zIndex={45}
            display={{ base: 'flex', lg: 'none' }}
          >
            <Button
              asChild
              _hover={{ bg: 'bg.hover' }}
              bg="transparent"
              borderRadius="md"
              variant="ghost"
              h="auto"
              p={2}
              color="fg.default"
            >
              <Link to="/">
                <Heading level="h2">Salvage Union</Heading>
                <Text fontSize="xs" color="brand.srd">
                  Dashboard
                </Text>
              </Link>
            </Button>
          </Flex>
          <IconButton
            onClick={toggleMenu}
            position="fixed"
            top={4}
            right={4}
            zIndex={50}
            bg="su.orange"
            color="su.white"
            p={2}
            borderRadius="md"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </IconButton>

          <Drawer.Root open={isOpen} onOpenChange={(e) => !e.open && toggleMenu()}>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Body>
                  <VStack gap={4} alignItems="stretch" w="full" mb={4}>
                    <Box w="full">
                      <UniversalSearchBar schemas={schemas} onResultSelect={toggleMenu} />
                    </Box>
                  </VStack>
                  {renderNavigationContent()}
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Drawer.Root>
        </>
      )}

      <Flex
        as="nav"
        position="static"
        bg="su.white"
        px={6}
        py={3}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        gap={0}
        display={{ base: 'none', lg: 'flex' }}
      >
        <Button
          asChild
          _hover={{ bg: 'bg.hover' }}
          bg="transparent"
          borderRadius="md"
          variant="ghost"
          h="auto"
          p={2}
          color="fg.default"
        >
          <Link to="/">
            <Heading level="h2">Salvage Union</Heading>
            <Text fontSize="xs" color="brand.srd">
              Dashboard
            </Text>
          </Link>
        </Button>

        <HStack as="ul" gap={2} flexDirection="row" w="auto">
          <Box as="li">
            <NavigationLink isActive={isActive('/dashboard', true)} to="/dashboard">
              Overview
            </NavigationLink>
          </Box>
          <Box as="li">
            <NavigationLink isActive={isActive('/dashboard/games')} to="/dashboard/games">
              Games
            </NavigationLink>
          </Box>
          <Box as="li">
            <NavigationLink isActive={isActive('/dashboard/crawlers')} to="/dashboard/crawlers">
              Crawlers
            </NavigationLink>
          </Box>
          <Box as="li">
            <NavigationLink isActive={isActive('/dashboard/pilots')} to="/dashboard/pilots">
              Pilots
            </NavigationLink>
          </Box>
          <Box as="li">
            <NavigationLink isActive={isActive('/dashboard/mechs')} to="/dashboard/mechs">
              Mechs
            </NavigationLink>
          </Box>
        </HStack>

        <Flex alignItems="center" gap={4} flexDirection="row" w="auto" ml="auto">
          <UserMenu
            user={user}
            onSignOut={handleSignOut}
            signingOut={signingOut}
            signInComponent={<DiscordSignInButton px={4} py={2} fontSize="sm" w="auto" />}
          />
        </Flex>
      </Flex>
    </>
  )
}
