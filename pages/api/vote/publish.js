import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { setStatus } from '../../../features/voting/server/db'
import VoteStatus from '../../../features/voting/common/vote-status'

export default methods({
  POST: authorize(Role.ADMIN, async (req, res) => {
    await setStatus(VoteStatus.RESULT)
    res.status(200).end()
  })
})
