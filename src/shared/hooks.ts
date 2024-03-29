import { useQuery } from 'react-query'
import { releases } from './api'
import { endpoints } from '../shared/constants'
import { releaseItemAdapter } from '../shared/utils'
import { ReleaseType } from '../types/releases'
import { DateParams } from '../types/common'
import { ReleaseItemFromApi } from '../types/api'

export function useReleases(type: ReleaseType, date: DateParams) {
  const { isLoading, error, data } = useQuery<ReleaseItemFromApi[]>(
    endpoints.RELEASES(type, date),
    () => releases(type, date),
  )

  return {
    isLoading,
    error,
    data: data?.map(release => releaseItemAdapter(release)),
  }
}
