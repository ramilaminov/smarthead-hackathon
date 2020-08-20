import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { getStatus, setStatus } from '../../../features/voting/server/db'
import VoteStatus from '../../../features/voting/common/vote-status'

export default methods({
  GET: authorize(Role.MEMBER, async (req, res) => {
    const status = await getStatus()
    const body = JSON.stringify(status)
    res.status(200).end(body)
  }),
  PUT: authorize(Role.ADMIN, async (req, res) => {
    const status = JSON.parse(req.body)
    if (VoteStatus.isValid(status)) {
      await setStatus(status)
      res.status(200).end()
    } else {
      res.status(400).end('Status is not valid')
    }
  })
})
