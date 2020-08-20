import { useState } from 'react'
import VoteStep from './vote-step'
import criteria from '../../common/criteria'
import VoteNavigation from './vote-navigation'
import { sendVote, useVoteTeams } from '../api'
import useInProgress from '../../../../core/client/use-in-progress'
import { Loader } from '../../../../core/client/components/icons'

// TODO refactor, move logic from here

const validateStep = (stepResults, votesTotal) => {
  const votesSpent = Object.values(stepResults)
    .reduce((sum, current) => sum + current, 0)
  
  const votesRemaining = votesTotal - votesSpent
  const isValid = votesRemaining == 0
  return { isValid, votesRemaining }
}

const resultsAreValid = (results, votesTotal) => {
  return results.every(step => validateStep(step, votesTotal).isValid)
}

export default function VoteContent() {
  const [step, setStep] = useState(0)
  const [results, setResults] = useState(criteria.map(() => ({})))
  const [sendInProgress, startSending] = useInProgress()
  
  const { teams } = useVoteTeams()

  if (!teams) {
    return <Loader />
  }

  const stepResults = results[step]
  const votesTotal = teams.length * 2

  const {
    isValid,
    votesRemaining 
  } = validateStep(stepResults, votesTotal)

  const votes = {
    votesTotal,
    votesRemaining,
    getVoteForId: (id) => stepResults[id] || 0,
    setVoteForId: (id, value) => {
      const newResults = [...results]
      newResults[step] = { ...stepResults, [id]: value }
      setResults(newResults)
    }
  }

  const nextIsEnabled = !sendInProgress && (
    step < criteria.length - 1
      ? isValid
      : resultsAreValid(results, votesTotal)
  )
  
  const onSend = () => startSending(sendVote(results))

  return (
    <>
      <VoteStep
        index={step}
        criteria={criteria}
        teams={teams}
        votes={votes}
        disabled={sendInProgress}
      />
      <VoteNavigation
        step={step}
        stepCount={criteria.length}
        nextIsEnabled={nextIsEnabled}
        onStepChange={setStep}
        onSend={onSend}
      />
    </>
  )
}