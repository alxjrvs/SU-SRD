import { BaseWizard } from '../shared/BaseWizard'
import { useCrawlerWizardState } from './useCrawlerWizardState'
import { CrawlerTypeSelectionStep } from './CrawlerTypeSelectionStep'
import { CrawlerBaysStep } from './CrawlerBaysStep'
import { CrawlerNameStep } from './CrawlerNameStep'
import { useCreateCrawlerFromWizard } from './useCreateCrawlerFromWizard'
import { useWizardCreation } from '../../hooks/useWizardCreation'

export function CrawlerWizard() {
  const wizardState = useCrawlerWizardState()
  const createCrawler = useCreateCrawlerFromWizard()
  const { isCreating, handleCreate } = useWizardCreation(createCrawler)

  const handleStepComplete = () => {
    wizardState.goToNextStep()
  }

  const handleCreateCrawler = () => handleCreate(wizardState.state)

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <CrawlerTypeSelectionStep wizardState={wizardState} onComplete={handleStepComplete} />
        )
      case 2:
        return <CrawlerBaysStep wizardState={wizardState} onComplete={handleStepComplete} />
      case 3:
        return <CrawlerNameStep wizardState={wizardState} onCreateCrawler={handleCreateCrawler} />
      default:
        return null
    }
  }

  const stepLabels = ['CRAWLER TYPE', 'CRAWLER BAYS', 'NAME'] as const

  return (
    <BaseWizard
      stepLabels={stepLabels}
      currentStep={wizardState.currentStep}
      completedSteps={wizardState.completedSteps}
      onStepChange={wizardState.goToStep}
      onPrevious={wizardState.goToPreviousStep}
      renderStep={renderStep}
      isCreating={isCreating}
      creatingMessage="Creating your crawler..."
    />
  )
}
