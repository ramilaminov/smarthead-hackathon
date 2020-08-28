import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { getStatus } from '../../../features/voting/server/db'

export default methods({
  GET: authorize(Role.MEMBER, async (req, res) => {
    const status = await getStatus()
    const body = JSON.stringify(status)
    res.status(200).end(body)
  })
})
