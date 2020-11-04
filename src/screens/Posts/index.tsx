import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
} from 'react-native'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import { usePosts } from '../../features/blog/use-posts'

import { BlogStackNavProps } from '../../types/screens'

const Posts: React.FC<BlogStackNavProps<'Posts'>> = ({ navigation }) => {
  const { posts } = usePosts()

  if (!posts) return null

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
      >
        <Text style={styles.title}>Блог</Text>
        <View>
          {posts.map(post => {
            const date = new Date(post.created_at * 1000)

            return (
              <Pressable
                style={styles.postCard}
                key={post.id}
                onPress={() => {
                  navigation.navigate('Post', { id: post.id })
                }}
              >
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDate}>
                  {format(date, 'd MMMM', { locale: ru })}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    height: '100%',
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '900',
    fontSize: 36,
    marginVertical: 16,
  },
  postCard: {
    marginBottom: 24,
    paddingVertical: 8,
  },
  postTitle: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 8,
  },
  postDate: {
    fontSize: 20,
  },
})

export default Posts
