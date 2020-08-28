import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { setStatus, clearVoting } from '../../../features/voting/server/db'
import VoteStatus from '../../../features/voting/common/vote-status'

export default methods({
  POST: authorize(Role.ADMIN, async (req, res) => {
    // TODO transaction
    await clearVoting()
    await setStatus(VoteStatus.NONE)
    res.status(200).end()
  })
})
