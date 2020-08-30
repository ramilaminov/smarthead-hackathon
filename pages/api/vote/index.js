import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { setVoting, getStatus, getParticipated } from '../../../features/voting/server/db'
import { getSession } from 'next-auth/client'
import VoteStatus from '../../../features/voting/common/vote-status'
import { validateResults } from '../../../features/voting/common/validation'
import { getUser } from '../../../features/auth/server/db'
import { getTeams } from '../../../features/team/server/db'
import { VOTING_FEATURE } from '../../../features/flags'

export default methods({
  POST: authorize(Role.MEMBER, async (req, res) => {
    if (!VOTING_FEATURE) {
      res.status(400).end()
      return
    }
    
    const results = JSON.parse(req.body)
    
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
