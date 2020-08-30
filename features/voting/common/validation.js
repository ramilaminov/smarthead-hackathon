import criteria from './criteria'

export const numVotesForTeams = (numTeams) => numTeams * 2

export const validateResults = (results, user, numTeams) => {
  if (results.length !== criteria.length) {
    // Must vote by all criteria
    return false
  }

  const numVotes = numVotesForTeams(user.team ? numTeams - 1 : numTeams)

  for (const criterionVotes of results) {
    if (!criterionVotes) {
      // Must vote by all criteria (criterion votes should not be nill)
      return false
    }
    let sum = 0
    for (const [teamId, value] of Object.entries(criterionVotes)) {
      if (user.team && teamId === user.team.id) {
        // Can't vote for own team
        return false
      }
      sum += value
    }
    if (sum !== numVotes) {
      // Must spend exactly all the votes
      return false
    }
  }

  return true
}
