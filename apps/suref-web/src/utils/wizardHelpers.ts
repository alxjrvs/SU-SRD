import { useCallback } from 'react'
import { getUser } from '../lib/api'

/**
 * Helper to ensure user is authenticated
 * Throws error if user is not authenticated
 */
export async function ensureAuthenticated() {
  const user = await getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }
  return user
}

/**
 * Hook to create a setter function for a wizard state field
 * Reduces boilerplate in wizard state hooks
 *
 * @example
 * const setCallsign = useWizardSetter(setState, 'callsign')
 */
export function useWizardSetter<TState, TValue>(
  setState: React.Dispatch<React.SetStateAction<TState>>,
  fieldName: keyof TState
): (value: TValue) => void {
  return useCallback(
    (value: TValue) => {
      setState((prev) => ({ ...prev, [fieldName]: value }))
    },
    [setState, fieldName]
  )
}

