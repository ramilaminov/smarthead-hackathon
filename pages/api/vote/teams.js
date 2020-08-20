import { getSession } from 'next-auth/client'
import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { getAnotherTeams } from '../../../features/voting/server/db'

export default methods({
  GET: authorize(Role.MEMBER, async (req, res) => {
    const { id: userId } = await getSession({ req })
    const data = await getAnotherTeams(userId)
    const body = JSON.stringify(data)
    res.status(200).end(body)
  })
})
