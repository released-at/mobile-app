import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Linking,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Markdown, { RenderRules } from 'react-native-markdown-display'
import YoutubePlayer from 'react-native-youtube-iframe'
import getYoutubeId from 'get-youtube-id'
import { usePost } from '../../features/blog/use-post'

import { BlogStackNavProps } from '../../types/screens'

const fullWidth = Dimensions.get('window').width

const rules: RenderRules = {
  link: (node, children, parent, styles) => {
    if (node.attributes.href.includes('youtube')) {
      const youtubeId = getYoutubeId(node.attributes.href) as string

      return (
        <YoutubePlayer
          key={node.key}
          width={fullWidth - 32}
          height={270}
          videoId={youtubeId}
          initialPlayerParams={{}}
        />
      )
    }

    return (
      <Text
        key={node.key}
        style={styles.link}
        onPress={() => {
          Linking.openURL(node.attributes.href)
        }}
      >
        {children}
      </Text>
    )
  },
}

const Post: React.FC<BlogStackNavProps<'Post'>> = ({ route }) => {
  const { id } = route.params
  const { post } = usePost(id)

  if (!post) return null

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}
        >
          <Text style={styles.title}>{post.title}</Text>
          <Markdown
            rules={rules}
            style={{
              body: {
                fontSize: 18,
                lineHeight: 28,
                marginBottom: 28,
              },
            }}
          >
            {post.body}
          </Markdown>
        </ScrollView>
      </SafeAreaView>
    </>
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
})

export default Post
