import type { WizardState } from './utils'
import { validateWizardStep } from './utils'
import { useBaseWizardState } from '../../hooks/useBaseWizardState'
import { useWizardSetter } from '../../utils/wizardHelpers'

export interface UseMechWizardStateReturn {
  state: WizardState
  currentStep: number
  completedSteps: Set<number>
  isStepComplete: (step: number) => boolean
  getNextIncompleteStep: () => number | null
  goToStep: (step: number) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  setSelectedChassisId: (chassisId: string | null) => void
  setSelectedSystemIds: (systemIds: string[]) => void
  setSelectedModuleIds: (moduleIds: string[]) => void
  setSelectedPatternName: (patternName: string | null) => void
  setAppearance: (appearance: string) => void
  setQuirk: (quirk: string) => void
  setPatternName: (patternName: string) => void
  reset: () => void
}

const initialState: WizardState = {
  selectedChassisId: null,
  selectedSystemIds: [],
  selectedModuleIds: [],
  selectedPatternName: null,
  appearance: '',
  quirk: '',
  patternName: '',
}

export function useMechWizardState(): UseMechWizardStateReturn {
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
    setSelectedChassisId: useWizardSetter<WizardState, string | null>(
      setState,
      'selectedChassisId'
    ),
    setSelectedSystemIds: useWizardSetter<WizardState, string[]>(setState, 'selectedSystemIds'),
    setSelectedModuleIds: useWizardSetter<WizardState, string[]>(setState, 'selectedModuleIds'),
    setSelectedPatternName: useWizardSetter<WizardState, string | null>(
      setState,
      'selectedPatternName'
    ),
    setAppearance: useWizardSetter<WizardState, string>(setState, 'appearance'),
    setQuirk: useWizardSetter<WizardState, string>(setState, 'quirk'),
    setPatternName: useWizardSetter<WizardState, string>(setState, 'patternName'),
    reset: baseWizard.reset,
  }
}
