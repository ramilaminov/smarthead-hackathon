import { getSession } from 'next-auth/client'
import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { getUserByEmail } from '../../../features/auth/server/db'

export default methods({
  GET: authorize(Role.MEMBER, async (req, res) => {
    const session = await getSession({ req })
    const user = await getUserByEmail(session.user.email)

    // TODO перенести логику в db
    // TODO избавиться от getUserByEmail
    // (в сессии есть id, можно брать doc напрямую)

    let data = null
    if (user.team) {
      const team = await user.team.get()
      data = team.data()
    }
    
    const body = JSON.stringify(data)
    res.status(200).end(body)
  })
})
