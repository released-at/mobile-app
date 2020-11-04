import { useQuery } from 'react-query'
import { films } from '../../shared/api'
import { releaseItemAdapter } from '../../shared/utils'
import { endpoints } from '../../shared/constants'

import { FilmItemFromApi } from '../../types/api'
import { FilmItem } from '../../types/releases'

export function useFilms() {
  const { isLoading, error, data } = useQuery<FilmItemFromApi[]>(
    endpoints.FILMS,
    films,
  )

  return {
    isLoading,
    error,
    films: data?.map(release => releaseItemAdapter(release) as FilmItem),
  }
}
