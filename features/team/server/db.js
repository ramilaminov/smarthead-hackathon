import db from '../../../core/server/db'

export const getTeams = async () => {
  const data = await db.collection("teams")
    .get()
    
  return data.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
}
