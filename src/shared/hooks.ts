import { useQuery } from 'react-query'
import { releases } from './api'
import { ReleaseType, Releases } from '../types/releases'
import { DateParams } from '../types/common'

export function useReleases(type: ReleaseType, date: DateParams) {
  const { isLoading, error, data } = useQuery<Releases>(
    `${type}/${date.month}-${date.year}`,
    () => releases(type, date),
  )

  return {
    isLoading,
    error,
    data,
  }
}
