const GUEST = 1
const MEMBER = 2
const ADMIN = 3
const OWNER = 4

const title = (role) => {
  switch (role) {
    case GUEST: return 'guest'
    case MEMBER: return 'member'
    case ADMIN: return 'admin'
    case OWNER: return 'owner'
    default: return null
  }
}

export default {
  GUEST,
  MEMBER,
  ADMIN,
  OWNER,
  title
}
