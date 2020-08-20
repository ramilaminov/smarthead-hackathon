import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { getParticipated } from '../../../features/voting/server/db'
import { getSession } from 'next-auth/client'

export default methods({
  GET: authorize(Role.MEMBER, async (req, res) => {
    const { id: userId } = await getSession({ req })
    const status = await getParticipated(userId)

    const body = JSON.stringify({ value: status })
    res.status(200).end(body)
  })
})
