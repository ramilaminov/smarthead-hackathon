import { useData } from '../../../core/client/swr'

export const useMyTeam = () => useData('/api/teams/my', 'team')
export const useTeams = () => useData('/api/teams', 'teams')