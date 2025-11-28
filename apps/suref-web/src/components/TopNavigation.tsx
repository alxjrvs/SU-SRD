import {
  Box,
  Button,
  Flex,
  IconButton,
  HStack,
  Menu,
  Portal,
  Text,
  Spinner,
  useBreakpointValue,
  Drawer,
  VStack,
} from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import type { SchemaInfo } from '../types/schema'
import { Link } from '@tanstack/react-router'
import { Heading } from './base/Heading'
import { useNavigationState } from '../hooks/useNavigationState'
import { NavigationLink } from './shared/NavigationLink'
import { DiscordSignInButton } from './DiscordSignInButton'
import { UniversalSearchBar } from './shared/UniversalSearchBar'

interface TopNavigationProps {
  user: User | null
  userLoading?: boolean
  schemas?: SchemaInfo[]
}

export function TopNavigation({ user, userLoading = false, schemas = [] }: TopNavigationProps) {
  const { isOpen, signingOut, handleNavigate, handleSignOut, isActive, toggleMenu } =
    useNavigationState()
  
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
            SRD
          </Text>
        </Link>
      </Button>

      <VStack as="ul" gap={2} alignItems="stretch" w="full" listStyleType="none">
        <Box as="li">
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                px={4}
                py={2}
                _hover={{ bg: 'bg.hover' }}
                bg={isActive('/schema') ? 'bg.active' : 'transparent'}
                borderBottomWidth={isActive('/schema') ? '3px' : 0}
                borderBottomColor="su.orange"
                color="fg.default"
                fontWeight={isActive('/schema') ? 'semibold' : 'normal'}
                borderRadius="md"
                variant="ghost"
                h="auto"
                w="full"
                justifyContent="flex-start"
              >
                Reference
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content
                maxH="300px"
                minW="200px"
                overflowY="auto"
                bg="bg.canvas"
                borderColor="border.default"
              >
                {schemas.map((schema) => (
                  <Menu.Item
                    key={schema.id}
                    value={schema.id}
                    onSelect={() => {
                      handleNavigate(`/schema/${schema.id}`)
                      toggleMenu()
                    }}
                    color="fg.default"
                  >
                    {schema.displayName || schema.title.replace('Salvage Union ', '')}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Box>

        <Box as="li">
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                px={4}
                py={2}
                _hover={{ bg: 'bg.hover' }}
                bg={isActive('/sheets') ? 'bg.active' : 'transparent'}
                borderBottomWidth={isActive('/sheets') ? '3px' : 0}
                borderBottomColor="su.orange"
                color="fg.default"
                fontWeight={isActive('/sheets') ? 'semibold' : 'normal'}
                borderRadius="md"
                variant="ghost"
                h="auto"
                w="full"
                justifyContent="flex-start"
              >
                Playground
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content minW="200px" bg="bg.canvas" borderColor="border.default">
                <Menu.Item
                  value="mech-sheet"
                  onSelect={() => {
                    handleNavigate('/sheets/mech')
                    toggleMenu()
                  }}
                  color="fg.default"
                >
                  Mech Live Sheet
                </Menu.Item>
                <Menu.Item
                  value="pilot-sheet"
                  onSelect={() => {
                    handleNavigate('/sheets/pilot')
                    toggleMenu()
                  }}
                  color="fg.default"
                >
                  Pilot Live Sheet
                </Menu.Item>
                <Menu.Item
                  value="crawler-sheet"
                  onSelect={() => {
                    handleNavigate('/sheets/crawler')
                    toggleMenu()
                  }}
                  color="fg.default"
                >
                  Crawler Live Sheet
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        </Box>

        <Box as="li">
          <Button
            asChild
            px={4}
            py={2}
            _hover={{ bg: 'bg.hover' }}
            bg={isActive('/randsum') ? 'bg.active' : 'transparent'}
            borderBottomWidth={isActive('/randsum') ? '3px' : 0}
            borderBottomColor="su.orange"
            color="fg.default"
            fontWeight={isActive('/randsum') ? 'semibold' : 'normal'}
            borderRadius="md"
            variant="ghost"
            h="auto"
            w="full"
            justifyContent="flex-start"
            onClick={toggleMenu}
          >
            <Link to="/randsum">Discord Bot</Link>
          </Button>
        </Box>

        <Box as="li">
          <Button
            asChild
            px={4}
            py={2}
            _hover={{ bg: 'bg.hover' }}
            bg={isActive('/about') ? 'bg.active' : 'transparent'}
            borderBottomWidth={isActive('/about') ? '3px' : 0}
            borderBottomColor="su.orange"
            color="fg.default"
            fontWeight={isActive('/about') ? 'semibold' : 'normal'}
            borderRadius="md"
            variant="ghost"
            h="auto"
            w="full"
            justifyContent="flex-start"
            onClick={toggleMenu}
          >
            <Link to="/about">About</Link>
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
        {userLoading ? (
          <Spinner size="sm" color="fg.default" />
        ) : user ? (
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                px={4}
                py={2}
                fontSize="sm"
                color="fg.default"
                fontWeight="medium"
                bg="transparent"
                _hover={{ bg: 'bg.hover' }}
                borderRadius="md"
                variant="ghost"
                h="auto"
                w="full"
                justifyContent="flex-start"
              >
                {user.user_metadata?.preferred_username ||
                  user.user_metadata?.full_name ||
                  user.email?.split('@')[0] ||
                  'User'}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content minW="200px" bg="bg.canvas" borderColor="border.default">
                  <Menu.Item
                    value="pilots"
                    onSelect={() => {
                      handleNavigate('/dashboard/pilots')
                      toggleMenu()
                    }}
                    color="fg.default"
                  >
                    Pilots
                  </Menu.Item>
                  <Menu.Item
                    value="mechs"
                    onSelect={() => {
                      handleNavigate('/dashboard/mechs')
                      toggleMenu()
                    }}
                    color="fg.default"
                  >
                    Mechs
                  </Menu.Item>
                  <Menu.Item
                    value="crawlers"
                    onSelect={() => {
                      handleNavigate('/dashboard/crawlers')
                      toggleMenu()
                    }}
                    color="fg.default"
                  >
                    Crawlers
                  </Menu.Item>
                  <Menu.Item
                    value="games"
                    onSelect={() => {
                      handleNavigate('/dashboard/games')
                      toggleMenu()
                    }}
                    color="fg.default"
                  >
                    Games
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item
                    value="signout"
                    onSelect={handleSignOut}
                    disabled={signingOut}
                    color="brand.srd"
                  >
                    {signingOut ? 'Signing out...' : 'Sign out'}
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ) : (
          <DiscordSignInButton
            px={4}
            py={2}
            fontSize="sm"
            w="full"
            display="flex"
            alignItems="center"
            gap={2}
          />
        )}
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
                  SRD
                </Text>
              </Link>
            </Button>
            <Box flex="1" maxW="400px" mx={4}>
              <UniversalSearchBar schemas={schemas} />
            </Box>
            <Box w="48px" />
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
                <Drawer.Header>
                  <Heading level="h2">Menu</Heading>
                </Drawer.Header>
                <Drawer.Body>{renderNavigationContent()}</Drawer.Body>
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
        justifyContent="flex-start"
        flexDirection="row"
        gap={0}
        overflow="visible"
        display={{ base: 'none', lg: 'flex' }}
      >
        <Flex
          alignItems="center"
          gap={2}
          flexDirection="row"
          flex={1}
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
                SRD
              </Text>
            </Link>
          </Button>

          <HStack
            as="ul"
            gap={2}
            flexDirection="row"
            w="auto"
          >
            <Box as="li">
              <UniversalSearchBar schemas={schemas} />
            </Box>

            <Box as="li">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button
                    px={4}
                    py={2}
                    _hover={{ bg: 'bg.hover' }}
                    bg={isActive('/schema') ? 'bg.active' : 'transparent'}
                    borderBottomWidth={isActive('/schema') ? '3px' : 0}
                    borderBottomColor="su.orange"
                    color="fg.default"
                    fontWeight={isActive('/schema') ? 'semibold' : 'normal'}
                    borderRadius="md"
                    variant="ghost"
                    h="auto"
                    w="auto"
                  >
                    Reference
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content
                      maxH="300px"
                      minW="200px"
                      overflowY="auto"
                      bg="bg.canvas"
                      borderColor="border.default"
                    >
                      {schemas.map((schema) => (
                        <Menu.Item
                          key={schema.id}
                          value={schema.id}
                          onSelect={() => handleNavigate(`/schema/${schema.id}`)}
                          color="fg.default"
                        >
                          {schema.displayName || schema.title.replace('Salvage Union ', '')}
                        </Menu.Item>
                      ))}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>

            <Box as="li">
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button
                    px={4}
                    py={2}
                    _hover={{ bg: 'bg.hover' }}
                    bg={isActive('/sheets') ? 'bg.active' : 'transparent'}
                    borderBottomWidth={isActive('/sheets') ? '3px' : 0}
                    borderBottomColor="su.orange"
                    color="fg.default"
                    fontWeight={isActive('/sheets') ? 'semibold' : 'normal'}
                    borderRadius="md"
                    variant="ghost"
                    h="auto"
                    w="auto"
                  >
                    Playground
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content minW="200px" bg="bg.canvas" borderColor="border.default">
                      <Menu.Item
                        value="mech-sheet"
                        onSelect={() => handleNavigate('/sheets/mech')}
                        color="fg.default"
                      >
                        Mech Live Sheet
                      </Menu.Item>
                      <Menu.Item
                        value="pilot-sheet"
                        onSelect={() => handleNavigate('/sheets/pilot')}
                        color="fg.default"
                      >
                        Pilot Live Sheet
                      </Menu.Item>
                      <Menu.Item
                        value="crawler-sheet"
                        onSelect={() => handleNavigate('/sheets/crawler')}
                        color="fg.default"
                      >
                        Crawler Live Sheet
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>

            <Box as="li">
              <NavigationLink isActive={isActive('/randsum')} to="/randsum">
                Discord Bot
              </NavigationLink>
            </Box>

            <Box as="li">
              <NavigationLink isActive={isActive('/about')} to="/about">
                About
              </NavigationLink>
            </Box>
          </HStack>
        </Flex>

        <Flex
          alignItems="center"
          gap={4}
          flexDirection="row"
          w="auto"
          ml="auto"
        >
          {userLoading ? (
            <Spinner size="sm" color="fg.default" />
          ) : user ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Button
                  px={4}
                  py={2}
                  fontSize="sm"
                  color="fg.default"
                  fontWeight="medium"
                  bg="transparent"
                  _hover={{ bg: 'bg.hover' }}
                  borderRadius="md"
                  variant="ghost"
                  h="auto"
                  w="auto"
                >
                  {user.user_metadata?.preferred_username ||
                    user.user_metadata?.full_name ||
                    user.email?.split('@')[0] ||
                    'User'}
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content minW="200px" bg="bg.canvas" borderColor="border.default">
                    <Menu.Item
                      value="pilots"
                      onSelect={() => handleNavigate('/dashboard/pilots')}
                      color="fg.default"
                    >
                      Pilots
                    </Menu.Item>
                    <Menu.Item
                      value="mechs"
                      onSelect={() => handleNavigate('/dashboard/mechs')}
                      color="fg.default"
                    >
                      Mechs
                    </Menu.Item>
                    <Menu.Item
                      value="crawlers"
                      onSelect={() => handleNavigate('/dashboard/crawlers')}
                      color="fg.default"
                    >
                      Crawlers
                    </Menu.Item>
                    <Menu.Item
                      value="games"
                      onSelect={() => handleNavigate('/dashboard/games')}
                      color="fg.default"
                    >
                      Games
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item
                      value="signout"
                      onSelect={handleSignOut}
                      disabled={signingOut}
                      color="brand.srd"
                    >
                      {signingOut ? 'Signing out...' : 'Sign out'}
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ) : (
            <DiscordSignInButton
              px={4}
              py={2}
              fontSize="sm"
              w="auto"
              display="flex"
              alignItems="center"
              gap={2}
            />
          )}
        </Flex>
      </Flex>
    </>
  )
}
