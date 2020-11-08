import React from 'react'
import PostCard from './PostCard'
import ScreenWrapper from '../../components/ScreenWrapper'
import { usePosts } from '../../features/blog/use-posts'

import { BlogStackNavProps } from '../../types/screens'

const Posts: React.FC<BlogStackNavProps<'Posts'>> = ({ navigation }) => {
  const { posts } = usePosts()

  if (!posts) return null

  return (
    <ScreenWrapper title="Блог">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </ScreenWrapper>
  )
}

export default Posts
