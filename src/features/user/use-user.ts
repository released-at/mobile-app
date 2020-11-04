import { useQuery } from 'react-query'
import { getToken, removeToken } from './utils'
import { endpoints } from '../../shared/constants'

import { User } from '../../types/user'

async function fetchWithToken() {
  const token = await getToken()

  if (!token) return

  return fetch(endpoints.PROFILE, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(res => res.json())
    .catch(async () => {
      await removeToken()
    })
}

export function useUser() {
  const { isLoading, error, data } = useQuery<User>(
    endpoints.PROFILE,
    fetchWithToken,
    { retry: false, refetchOnMount: true, refetchOnReconnect: true },
  )

  return {
    isLoading,
    error,
    user: data,
    isLoggedIn: !!data,
  }
}
