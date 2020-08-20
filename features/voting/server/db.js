import db from '../../../core/server/db'

const statusRef = () => db.doc('votingState/status')
const userVoteRef = (userId) => db.doc(`votes/${userId}`)

export const getStatus = async () => {
  const statusDoc = await statusRef().get()
  return statusDoc.data().value
}

export const setStatus = async (status) => {
  await statusRef().set({
    value: status
  })
}

export const setVoting = async (userId, result) => {
  await userVoteRef(userId).set({
    data: result
  })
}

export const getParticipated = async (userId) => {
  const doc = await userVoteRef(userId).get()
  return doc.exists
}

export const getAnotherTeams = async (userId) => {
  const user = await db.doc(`users/${userId}`).get()
  const allTeams = await db.collection("teams").get()

  const userTeam = user.data().team
  if (!userTeam) {
    return allTeams.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
  }
  
  return allTeams.docs
    .filter(doc => doc.id !== userTeam.id)
    .map(doc => ({ id: doc.id, ...doc.data() }))
}
