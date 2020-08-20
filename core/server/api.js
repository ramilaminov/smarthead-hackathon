import { getSession } from 'next-auth/client'

export const authorize = (role, handler) => async (req, res) => {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).end('401 Unauthorized')
    return
  }

  if (session.role < role) {
    res.status(403).end('403 Forbidden')
    return
  }

  return await handler(req, res)
}

export const methods = (methodHandlers) => async (req, res) => {
  const { method } = req

  if (methodHandlers.hasOwnProperty(method)) {
    const handler = methodHandlers[method]
    return await handler(req, res)
  } else {
    res.setHeader('Allow', Object.keys(methodHandlers))
    res.status(405).end(`405 Method Not Allowed`)
  }
}
