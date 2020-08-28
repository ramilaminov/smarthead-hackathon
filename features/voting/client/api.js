import { useData, sendAction, changeData } from '../../../core/client/swr'
import { mutate } from 'swr'
import VoteStatus from '../common/vote-status'

export const useParticipated = () => useData('/api/vote/participated', 'participated')
export const useVoteTeams = () => useData('/api/vote/teams', 'teams')

export const sendVote = async (vote) => {
  await sendAction('/api/vote', vote)
  mutate('/api/vote/participated', { value: true })
}

export const useVoteStatus = () => useData('/api/vote/status', 'status')

export const openVoting = async () => {
  await sendAction('/api/vote/open')
  mutate('/api/vote/status', VoteStatus.OPEN)
}

export const closeVoting = async () => {
  await sendAction('/api/vote/close')
  mutate('/api/vote/status', VoteStatus.CLOSED)
}

export const publishResults = async () => {
  await sendAction('/api/vote/publish')
  mutate('/api/vote/status', VoteStatus.RESULT)
}

export const resetVoting = async () => {
  await sendAction('/api/vote/reset')
  mutate('/api/vote/status', VoteStatus.NONE)
}
