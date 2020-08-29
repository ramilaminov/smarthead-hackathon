import Role from '../../../core/common/role'
import { authorize, methods } from '../../../core/server/api'
import { setStatus, setResults } from '../../../features/voting/server/db'
import VoteStatus from '../../../features/voting/common/vote-status'
import criteria from '../../../features/voting/common/criteria'
import { getCollection } from '../../../core/server/db-helpers'
import { calculateResults } from '../../../features/voting/server/calculation'
import db from '../../../core/server/db'

export default methods({
  POST: authorize(Role.ADMIN, async (req, res) => {
    
    // TODO transaction

    const teams = await getCollection(db, 'teams')
    const users = await getCollection(db, 'users')
    const votes = await getCollection(db, 'votes')

    // TODO validate data

    const results = calculateResults(teams, users, votes, criteria)

    console.log('Results: ', results)
    
    await setStatus(VoteStatus.CLOSED)
    await setResults(results)

    res.status(200).end()
  })
})
