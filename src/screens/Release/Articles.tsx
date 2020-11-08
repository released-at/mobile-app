import React from 'react'
import { FlatList, View, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import Text from '../../components/Text'
import Title from '../../components/Title'
import GradientOnImage from '../../components/GradientOnImage'

import { PostItem } from '../../types/blog'

interface Props {
  articles: PostItem[]
}

function Articles({ articles }: Props) {
  const { navigate } = useNavigation()

  return (
    <View>
      <Text style={styles.listTitle}>Статьи, в которых упоминался релиз:</Text>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <Pressable
            style={styles.article}
            onPress={() => {
              navigate('Post', {
                id: item.id,
              })
            }}
          >
            <GradientOnImage width={220} height={140} src={item.cover}>
              <View style={styles.footer}>
                <Title style={styles.title} h4>
                  {item.title}
                </Title>
                <Text style={styles.date}>
                  {format(new Date(item.created_at * 1000), 'd MMMM', {
                    locale: ru,
                  })}
                </Text>
              </View>
            </GradientOnImage>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listTitle: {
    marginBottom: 4,
  },
  article: {
    marginRight: 16,
  },
  footer: {
    position: 'absolute',
    zIndex: 10,
    bottom: 10,
    left: 10,
  },
  title: {
    color: '#fff',
    lineHeight: 20,
    marginBottom: 8,
  },
  date: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 12,
  },
})

export default Articles
