import db from '../../../core/server/db'

export const getUserByEmail = async (email) => {
  const result = await db.collection("users")
    .where("email", "==", email)
    .get()
  
  if (result.empty) {
    return null
  }
  const doc = result.docs[0]
  return { id: doc.id, ...doc.data() }
}
