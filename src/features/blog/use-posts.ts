import { useQuery } from 'react-query'
import { posts } from '../../shared/api'
import { endpoints } from '../../shared/constants'

import { PostItem } from '../../types/blog'

export function usePosts() {
  const { data, isLoading, error } = useQuery<{ posts: PostItem[] }>(
    endpoints.POSTS,
    posts,
  )

  return {
    posts: data ? data.posts : [],
    isLoading,
    error,
  }
}
