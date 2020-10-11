import { useQuery } from 'react-query'
import { releases } from './api'
import { ReleaseType, Releases } from '../types/releases'
import { DateParams } from '../types/common'
import { endpoints } from '../shared/constants'

export function useReleases(type: ReleaseType, date: DateParams) {
  const { isLoading, error, data } = useQuery<Releases>(
    endpoints.RELEASES(type, date),
    () => releases(type, date),
  )

  return {
    isLoading,
    error,
    data,
  }
}
