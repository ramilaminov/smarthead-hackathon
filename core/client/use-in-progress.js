import { useState } from 'react'

export default () => {
  const [inProgress, setInProgress] = useState(false)
  const start = (promise) => {
    setInProgress(true)
    promise.finally(() => setInProgress(false))
  }
  return [inProgress, start]
}
