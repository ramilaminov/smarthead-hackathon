import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { getTeams } from '../../../features/team/server/db'

export default methods({
  GET: authorize(Role.MEMBER, async (req, res) => {
    const data = await getTeams()
    const body = JSON.stringify(data)
    res.status(200).end(body)
  })
})
