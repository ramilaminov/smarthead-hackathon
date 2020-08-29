import { getSession } from 'next-auth/client'
import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { getUser } from '../../../features/auth/server/db'

export default methods({
  GET: authorize(Role.MEMBER, async (req, res) => {
    const { userId } = await getSession({ req })
    const user = await getUser(userId)

    let data = null
    if (user.team) {
      const team = await user.team.get()
      data = team.data()
    }
    
    const body = JSON.stringify(data)
    res.status(200).end(body)
  })
})
