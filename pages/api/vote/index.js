import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { setVoting, getStatus, getParticipated } from '../../../features/voting/server/db'
import { getSession } from 'next-auth/client'
import VoteStatus from '../../../features/voting/common/vote-status'
import { getUser } from '../../../features/auth/server/db'
import criteria from '../../../features/voting/common/criteria'
import { getTeams } from '../../../features/team/server/db'

// TODO вынести отсюда
const numVotesForTeams = (numTeams) => numTeams * 2

// TODO вынести отсюда
const validateResults = (results, user, numTeams) => {
  if (results.length !== criteria.length) {
    // Нужно проголосовать по всем критериям
    return false
  }

  const numVotes = numVotesForTeams(user.team ? numTeams - 1 : numTeams)

  for (const criterionVotes of results) {
    if (!criterionVotes) {
      // Нужно проголосовать по всем критериям
      return false
    }
    let sum = 0
    for (const [teamId, value] of Object.entries(criterionVotes)) {
      if (user.team && teamId === user.team.id) {
        // Нельзя голосовать за свою команду
        return false
      }
      sum += value
    }
    if (sum !== numVotes) {
      // Нужно истратить ровно все голоса
      return false
    }
  }

  return true
}

export default methods({
  POST: authorize(Role.MEMBER, async (req, res) => {
    const results = JSON.parse(req.body)
    console.log('Votes received', results)
    
    const { userId } = await getSession({ req })

    // TODO transaction

    const voteStatus = await getStatus()
    if (voteStatus !== VoteStatus.OPEN) {
      res.status(400).end()
      return
    }

    const participated = await getParticipated(userId)
    if (participated) {
      res.status(400).end()
      return
    }

    const user = await getUser(userId)
    const teams = await getTeams()

    if (!validateResults(results, user, teams.length)) {
      res.status(400).end()
      return
    }
    
    await setVoting(userId, results)

    res.status(200).end()
  })
})
