import { useData, sendAction, changeData } from '../../../core/client/swr'
import { mutate } from 'swr'
import VoteStatus from '../common/vote-status'

export const useVotingState = () => useData('/api/vote/state', 'state')

export const useVotingTeams = () => useData('/api/vote/teams', 'teams')

export const sendVote = async (vote) => {
  await sendAction('/api/vote', vote)
  mutate('/api/vote/state', state => ({ participated: true, ...state }))
}

export const openVoting = async () => {
  await sendAction('/api/vote/open')
  mutate('/api/vote/state', state => ({ status: VoteStatus.OPEN, ...state }))
}

export const closeVoting = async () => {
  await sendAction('/api/vote/close')
  mutate('/api/vote/state', state => ({ status: VoteStatus.CLOSED, ...state }))
}

export const publishResults = async () => {
  await sendAction('/api/vote/publish')
  mutate('/api/vote/state', state => ({ status: VoteStatus.PUBLISHED, ...state }))
}

export const resetVoting = async () => {
  await sendAction('/api/vote/reset')
  mutate('/api/vote/state', state => ({ status: VoteStatus.NONE, ...state }))
}
