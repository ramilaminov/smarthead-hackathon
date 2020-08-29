import { getSession } from 'next-auth/client'
import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { getAnotherTeams } from '../../../features/voting/server/db'

export default methods({
  GET: authorize(Role.MEMBER, async (req, res) => {
    const { userId } = await getSession({ req })
    const data = await getAnotherTeams(userId)
    
    res.status(200).json(data)
  })
})
