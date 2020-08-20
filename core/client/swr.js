import useSWR, { mutate } from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useData = (path, name) => {
  const { data, error } = useSWR(path, fetcher, {
    refreshInterval: 10000
  })
  return {
    [name || 'data']: data,
    isLoading: !error && !data,
    isError: error
  }
}

export const changeData = async (path, data, method) => {
  await fetch(path, {
    method: method || 'POST',
    body: JSON.stringify(data)
  })
  mutate(path)
}

export const sendAction = async (path, data, method) => {
  await fetch(path, {
    method: method || 'POST',
    body: data ? JSON.stringify(data) : null
  })
}
