import admin from 'firebase-admin'

if (admin.apps.length === 0) {
  const key = JSON.parse(process.env.FIRESTORE_KEY)
  
  admin.initializeApp({
    credential: admin.credential.cert(key)
  })
}

export default admin.firestore()
