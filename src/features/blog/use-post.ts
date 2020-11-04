import { useQuery } from 'react-query'
import { endpoints } from '../../shared/constants'
import { post } from '../../shared/api'

import { Post } from '../../types/blog'

export function usePost(id: number) {
  const { data, isLoading, error } = useQuery<{ post: Post }>(
    endpoints.POST(id),
    () => post(id),
  )

  return {
    post: data
      ? { ...data.post, created_at: new Date(data.post.created_at * 100) }
      : undefined,
    isLoading,
    error,
  }
}
