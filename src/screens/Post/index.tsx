import React from 'react'
import { Dimensions, Image } from 'react-native'
import Markdown, { RenderRules } from 'react-native-markdown-display'
import YoutubePlayer from 'react-native-youtube-iframe'
import * as Linking from 'expo-linking'
import getYoutubeId from 'get-youtube-id'
import ScreenWrapper from '../../components/ScreenWrapper'
import Text from '../../components/Text'
import { usePost } from '../../features/blog/use-post'
import { getFont } from '../../shared/utils'

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
          height={220}
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
    <ScreenWrapper title={post.title}>
      <Image
        source={{ uri: post.cover }}
        style={{ width: '100%', height: 250 }}
      />
      <Markdown
        rules={rules}
        style={{
          body: {
            fontSize: 18,
            lineHeight: 28,
            marginBottom: 28,
            color: '#f5f5f5',
          },
          heading2: {
            fontFamily: getFont('primary', 800),
            fontSize: 24,
            lineHeight: 24 * 1.4,
            letterSpacing: -0.33,
          },
          link: {
            textDecorationLine: 'none',
          },
          paragraph: {
            fontSize: 18,
            lineHeight: 28,
            fontFamily: getFont('secondary', 400),
          },
          em: {
            fontSize: 18,
            fontStyle: 'normal',
            fontFamily: getFont('secondary', 400, true),
          },
          image: {
            width: '100%',
            height: 250,
            flex: 1,
          },
        }}
      >
        {post.body}
      </Markdown>
    </ScreenWrapper>
  )
}

export default Post
