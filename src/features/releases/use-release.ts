import { useQuery } from 'react-query'
import { release } from '../../shared/api'
import { releaseAdapter } from '../../shared/utils'
import { endpoints } from '../../shared/constants'

import { ReleaseFromApi } from '../../types/api'

export function useRelease(id: number) {
  const { isLoading, error, data } = useQuery<ReleaseFromApi>(
    endpoints.RELEASE(id),
    () => release(id),
  )

  return {
    isLoading,
    error,
    release: data ? releaseAdapter(data) : data,
  }
}
