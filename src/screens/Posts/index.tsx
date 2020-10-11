import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
} from 'react-native'
import { useQuery } from 'react-query'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import * as api from '../../shared/api'
import { endpoints } from '../../shared/constants'

function Posts({ navigation }) {
  const { data } = useQuery(endpoints.POSTS, api.posts)

  if (!data) return null

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
      >
        <Text style={styles.title}>Блог</Text>
        <View>
          {data.posts.map(post => {
            const date = new Date(post.updated_at.split(' ')[0])

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
