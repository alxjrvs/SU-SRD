import type { WizardState } from './utils'
import { validateWizardStep } from './utils'
import { useBaseWizardState } from '../../hooks/useBaseWizardState'
import { useWizardSetter } from '../../utils/wizardHelpers'

export interface UsePilotWizardStateReturn {
  state: WizardState
  currentStep: number
  completedSteps: Set<number>
  isStepComplete: (step: number) => boolean
  getNextIncompleteStep: () => number | null
  goToStep: (step: number) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  setSelectedClassId: (classId: string | null) => void
  setSelectedAbilityId: (abilityId: string | null) => void
  setSelectedEquipmentIds: (equipmentIds: string[]) => void
  setCallsign: (callsign: string) => void
  setBackground: (background: string) => void
  setMotto: (motto: string) => void
  setKeepsake: (keepsake: string) => void
  setAppearance: (appearance: string) => void
  reset: () => void
}

const initialState: WizardState = {
  selectedClassId: null,
  selectedAbilityId: null,
  selectedEquipmentIds: [],
  callsign: '',
  background: '',
  motto: '',
  keepsake: '',
  appearance: '',
}

export function usePilotWizardState(): UsePilotWizardStateReturn {
  const baseWizard = useBaseWizardState({
    initialState,
    validateStep: validateWizardStep,
    totalSteps: 3,
  })

  const { state, setState } = baseWizard

  return {
    state,
    currentStep: baseWizard.currentStep,
    completedSteps: baseWizard.completedSteps,
    isStepComplete: baseWizard.isStepComplete,
    getNextIncompleteStep: baseWizard.getNextIncompleteStep,
    goToStep: baseWizard.goToStep,
    goToNextStep: baseWizard.goToNextStep,
    goToPreviousStep: baseWizard.goToPreviousStep,
    setSelectedClassId: useWizardSetter<WizardState, string | null>(setState, 'selectedClassId'),
    setSelectedAbilityId: useWizardSetter<WizardState, string | null>(
      setState,
      'selectedAbilityId'
    ),
    setSelectedEquipmentIds: useWizardSetter<WizardState, string[]>(
      setState,
      'selectedEquipmentIds'
    ),
    setCallsign: useWizardSetter<WizardState, string>(setState, 'callsign'),
    setBackground: useWizardSetter<WizardState, string>(setState, 'background'),
    setMotto: useWizardSetter<WizardState, string>(setState, 'motto'),
    setKeepsake: useWizardSetter<WizardState, string>(setState, 'keepsake'),
    setAppearance: useWizardSetter<WizardState, string>(setState, 'appearance'),
    reset: baseWizard.reset,
  }
}
