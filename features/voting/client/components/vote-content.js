import { useState } from 'react'
import VoteStep from './vote-step'
import criteria from '../../common/criteria'
import VoteNavigation from './vote-navigation'
import { sendVote, useVotingTeams } from '../api'
import useInProgress from '../../../../core/client/use-in-progress'
import { Loader } from '../../../../core/client/components/icons'
import { numVotesForTeams } from '../../common/validation'

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
  
  const { teams } = useVotingTeams()

  if (!teams) {
    return <Loader />
  }

  const stepResults = results[step]
  const votesTotal = numVotesForTeams(teams.length)

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
  
  const onStepChange = (index) => {
    setStep(index)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  const onSend = () => startSending(sendVote(results).catch(_ => (
    alert('Что-то пошло не так, попробуй ещё раз :(')
  )))

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
        onStepChange={onStepChange}
        onSend={onSend}
      />
    </>
  )
}