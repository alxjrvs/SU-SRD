import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Box, Flex, Text, Spinner } from '@chakra-ui/react'

const BOT_CALLBACK_URL = 'https://robo-production.up.railway.app/auth/callback'

/**
 * Discord user IDs are 17-19 digit numbers
 * Regex pattern to match Discord user ID format
 */
const DISCORD_USER_ID_PATTERN = /^\d{17,19}$/

/**
 * Check if the callback is from the Discord bot
 * @param state - The state parameter from OAuth callback
 * @param source - Optional source parameter
 * @returns true if this is a bot callback
 */
function isBotCallback(
  state: string | null | undefined,
  source: string | null | undefined
): boolean {
  // Check for explicit source=bot parameter
  if (source === 'bot') {
    return true
  }

  // Check if state matches Discord user ID pattern (17-19 digits)
  if (state && DISCORD_USER_ID_PATTERN.test(state)) {
    return true
  }

  return false
}

function AuthCallbackPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const state = params.get('state')
    const error = params.get('error')
    const source = params.get('source')

    // Check if this is a bot callback
    const isBot = isBotCallback(state, source)

    if (isBot) {
      // Forward to bot callback handler
      const botParams = new URLSearchParams()
      if (code) botParams.append('code', code)
      if (state) botParams.append('state', state)
      if (error) botParams.append('error', error)
      if (source) botParams.append('source', source)

      // Preserve any other query parameters
      params.forEach((value, key) => {
        if (!['code', 'state', 'error', 'source'].includes(key)) {
          botParams.append(key, value)
        }
      })

      const botUrl = `${BOT_CALLBACK_URL}?${botParams.toString()}`
      window.location.replace(botUrl)
      return
    }

    // Regular OAuth callback - redirect to dashboard which handles the callback
    // The dashboard component will process the OAuth code exchange
    // We need to preserve the query parameters in the URL so Dashboard can read them
    const dashboardParams = new URLSearchParams()
    if (code) dashboardParams.append('code', code)
    if (state) dashboardParams.append('state', state)
    if (error) dashboardParams.append('error', error)

    const dashboardUrl = dashboardParams.toString()
      ? `/dashboard?${dashboardParams.toString()}`
      : '/dashboard'

    window.location.replace(dashboardUrl)
  }, [])

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="su.white"
    >
      <Box textAlign="center">
        <Spinner size="xl" color="su.discordBlurple" mb={4} />
        <Text fontSize="lg" color="su.black">
          Processing authentication...
        </Text>
      </Box>
    </Flex>
  )
}

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallbackPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      code: search.code ? String(search.code) : undefined,
      state: search.state ? String(search.state) : undefined,
      error: search.error ? String(search.error) : undefined,
      source: search.source ? String(search.source) : undefined,
    }
  },
  head: () => ({
    meta: [
      {
        title: 'Authenticating - Salvage Union',
      },
      {
        name: 'robots',
        content: 'noindex, nofollow',
      },
    ],
  }),
})
