import { BaseWizard } from '../shared/BaseWizard'
import { usePilotWizardState } from './usePilotWizardState'
import { ClassSelectionStep } from './ClassSelectionStep'
import { EquipmentSelectionStep } from './EquipmentSelectionStep'
import { PersonalizeStep } from './PersonalizeStep'
import { useCreatePilotFromWizard } from './useCreatePilotFromWizard'
import { useWizardCreation } from '../../hooks/useWizardCreation'

export function PilotWizard() {
  const wizardState = usePilotWizardState()
  const createPilot = useCreatePilotFromWizard()
  const { isCreating, handleCreate } = useWizardCreation(createPilot)

  const handleStepComplete = () => {
    wizardState.goToNextStep()
  }

  const handleCreatePilot = () => handleCreate(wizardState.state)

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <ClassSelectionStep wizardState={wizardState} onComplete={handleStepComplete} />
      case 2:
        return <EquipmentSelectionStep wizardState={wizardState} onComplete={handleStepComplete} />
      case 3:
        return <PersonalizeStep wizardState={wizardState} onCreatePilot={handleCreatePilot} />
      default:
        return null
    }
  }

  const stepLabels = ['CLASS', 'EQUIPMENT', 'PERSONALIZE'] as const

  return (
    <BaseWizard
      stepLabels={stepLabels}
      currentStep={wizardState.currentStep}
      completedSteps={wizardState.completedSteps}
      onStepChange={wizardState.goToStep}
      onPrevious={wizardState.goToPreviousStep}
      renderStep={renderStep}
      isCreating={isCreating}
      creatingMessage="Creating your pilot..."
    />
  )
}
