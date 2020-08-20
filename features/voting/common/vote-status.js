const NONE = 'none'
const OPEN = 'open'
const CLOSED = 'closed'
const RESULT = 'result'

const isValid = (status) => {
  switch (status) {
    case NONE:
    case OPEN:
    case CLOSED:
    case RESULT:
      return true
    default:
      return false
  }
}

export default {
  NONE,
  OPEN,
  CLOSED,
  RESULT,
  isValid
}
