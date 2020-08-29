const NONE = 'none'
const OPEN = 'open'
const CLOSED = 'closed'
const PUBLISHED = 'published'

const isValid = (status) => {
  switch (status) {
    case NONE:
    case OPEN:
    case CLOSED:
    case PUBLISHED:
      return true
    default:
      return false
  }
}

export default {
  NONE,
  OPEN,
  CLOSED,
  PUBLISHED,
  isValid
}
