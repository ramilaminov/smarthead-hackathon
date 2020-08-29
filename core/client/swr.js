import useSWR, { mutate } from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useData = (path, name = 'data') => {
  const { data, isValidating, error } = useSWR(path, fetcher, {
    refreshInterval: 10000
  })
  return {
    [name]: data,
    isLoading: isValidating,
    isError: !!error
  }
}

const throwErrorStatus = (res) => {
  if (res.status >= 400 && res.status <= 599) {
    throw new Error(`Error status code ${res.status}`)
  }
  return res
}

export const changeData = async (path, data, method) => {
  throwErrorStatus(await fetch(path, {
    method: method || 'POST',
    body: JSON.stringify(data)
  }))
  mutate(path)
}

export const sendAction = async (path, data, method) => {
  throwErrorStatus(await fetch(path, {
    method: method || 'POST',
    body: data ? JSON.stringify(data) : null
  }))
}
