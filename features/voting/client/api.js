import { useData, sendAction, changeData } from '../../../core/client/swr'
import { mutate } from 'swr'

export const useParticipated = () => useData('/api/vote/participated', 'participated')
export const useVoteTeams = () => useData('/api/vote/teams', 'teams')

export const sendVote = async (vote) => {
  await sendAction('/api/vote', vote)
  mutate('/api/vote/participated', { value: true })
}

export const useVoteStatus = () => useData('/api/vote/status', 'status')
export const changeVoteStatus = async (status) => await changeData('/api/vote/status', status, 'PUT')
