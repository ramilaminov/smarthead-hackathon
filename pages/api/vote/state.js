import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { getStatus, getResults, getParticipated } from '../../../features/voting/server/db'
import { getSession } from 'next-auth/client'
import VoteStatus from '../../../features/voting/common/vote-status'

export default methods({
  GET: authorize(Role.MEMBER, async (req, res) => {
    const { id: userId, role } = await getSession({ req })
    
    const status = await getStatus()
    const participated = await getParticipated(userId)

    const state = { status, participated }

    if (status === VoteStatus.RESULT ||
      (status === VoteStatus.CLOSED && role >= Role.ADMIN)) {
      state.results = await getResults()
    }

    res.status(200).json(state)
  })
})
