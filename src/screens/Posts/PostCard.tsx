import React from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import Title from '../../components/Title'
import Text from '../../components/Text'
import GradientOnImage from '../../components/GradientOnImage'

import { PostItem } from '../../types/blog'

interface Props {
  post: PostItem
}

const PostCard: React.FC<Props> = ({ post }) => {
  const { navigate } = useNavigation()

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        navigate('Post', { id: post.id })
      }}
    >
      <GradientOnImage width="100%" height={400} src={post.cover}>
        <View style={styles.footer}>
          <Title style={styles.title} h2>
            {post.title}
          </Title>
          <Text style={styles.date}>
            {format(new Date(post.created_at * 1000), 'd MMMM', { locale: ru })}
          </Text>
        </View>
      </GradientOnImage>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    padding: 16,
    zIndex: 1,
  },
  title: {
    color: '#fff',
  },
  date: {
    color: '#fff',
  },
})

export default PostCard
