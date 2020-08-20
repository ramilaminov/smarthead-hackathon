import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { getUserByEmail } from '../../../features/auth/server/db'
import Role from '../../../core/common/role'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  
  secret: process.env.SECRET,

  session: {
    jwt: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET
  },

  callbacks: {
    session: async (session, user, sessionToken) => {
      const dbUser = await getUserByEmail(user.email)
      if (dbUser) {
        session.role = dbUser.role
        session.id = dbUser.id
      } else {
        session.role = Role.GUEST
      }
      return Promise.resolve(session)
    }
  },

  events: { },

  debug: false,
}

export default (req, res) => NextAuth(req, res, options)
