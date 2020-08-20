import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { setVoting, getStatus, getParticipated } from '../../../features/voting/server/db'
import { getSession } from 'next-auth/client'
import VoteStatus from '../../../features/voting/common/vote-status'

export default methods({
  POST: authorize(Role.MEMBER, async (req, res) => {
    const results = JSON.parse(req.body)
    console.log('Votes received', results)
    
    const { id: userId } = await getSession({ req })

    const voteStatus = await getStatus()
    if (voteStatus !== VoteStatus.OPEN) {
      res.status(400).end()
      return
    }

    const participated = await getParticipated(userId)
    if (participated) {
      res.status(400).end()
      return
    }
    
    // TODO Проверки:
    // - нет голосов за свою команду (кроме организаторов)
    // - есть голоса по каждому критерию
    // - суммы голосов по каждому критерию сходятся: нет лишних и все потрачены
    
    await setVoting(userId, results)

    res.status(200).end()
  })
})
