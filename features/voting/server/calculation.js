const calculateNumUsersWithoutTeams = (users) => {
  let result = 0
  for (const user of users.values()) {
    if (!user.team) result++
  }
  return result
}

export const calculateResults = (teams, users, votes, criteria) => {
  // Number of members by team
  const numMembers = new Map(Array.from(teams.keys(), key => [key, 0]))
  for (const userId of votes.keys()) {
    const user = users.get(userId)
    if (!user) {
      throw new Error(`Unknown user ${userId} in voting data`)
    }

    if (user.team) {
      const teamId = user.team.id
      numMembers.set(teamId, numMembers.get(teamId) + 1)
    }
  }

  // Number of users without team
  const numUsersWithoutTeam = calculateNumUsersWithoutTeams(users)

  // Sum by team
  const sum = new Map(Array.from(teams.keys(), key => [key, 0]))

  // Calculate
  for (const [userId, userVotes] of votes) {
    const user = users.get(userId)
    if (!user) {
      throw new Error(`Unknown user ${userId} in voting data`)
    }

    const userWeight = 1.0 / (
      user.team ? numMembers.get(user.team.id) : numUsersWithoutTeam
    )

    for (let i = 0; i < criteria.length; i++) {
      const criterionResult = userVotes.data[i]
      const criterionWeight = criteria[i].weight
      
      for (const [teamId, value] of Object.entries(criterionResult)) {
        if (user.team && teamId === user.team.id) {
          throw new Error(`User ${user.email} voted for his team "${teamId}"`)
        }
        const score = value * criterionWeight * userWeight
        sum.set(teamId, sum.get(teamId) + score)
      }
    }
  }

  return Array.from(sum.entries(), ([id, score]) => ({
    team: { id: id, ...teams.get(id) },
    score
  }))
}
