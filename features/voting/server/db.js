import db from '../../../core/server/db'
import { deleteCollection } from '../../../core/server/db-helpers'

const statusRef = () => db.doc('votingState/status')
const resultsRef = () => db.doc('votingState/results')
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

export const getResults = async () => {
  const resultsDoc = await resultsRef().get()
  const data = resultsDoc.data()
  return data ? data.value : null
}

export const setResults = async (results) => {
  await resultsRef().set({
    value: results
  })
}

export const setVoting = async (userId, result) => {
  await userVoteRef(userId).set({
    value: result
  })
}

export const clearVoting = async () => {
  await deleteCollection(db, 'votes')
  await resultsRef().delete()
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
