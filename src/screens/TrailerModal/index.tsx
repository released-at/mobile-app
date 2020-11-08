import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import getYoutubeId from 'get-youtube-id'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import Button from '../../components/Button'

import { TrailerModalNavProps } from '../../types/screens'

const TrailerModal: React.FC<TrailerModalNavProps<'TrailerModal'>> = ({
  route,
  navigation,
}) => {
  const { url } = route.params

  const ytId = getYoutubeId(url)

  return (
    <SafeAreaView style={styles.safe}>
      <FocusAwareStatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0, 0, 0, 0)"
      />
      <View style={styles.trailer}>
        {ytId && (
          <YoutubePlayer height={270} videoId={ytId} initialPlayerParams={{}} />
        )}
      </View>
      <View style={styles.footer}>
        <Button
          onPress={() => {
            navigation.goBack()
          }}
          extendedStyle={{
            button: () => ({
              width: '100%',
              backgroundColor: '#f5f5f5',
            }),
            text: {
              color: '#0b0b0b',
            },
          }}
        >
          Закрыть
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  trailer: {
    flex: 1,
    justifyContent: 'center',
  },
  trailerHeader: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 16,
    marginVertical: 16,
    display: 'flex',
  },
  trailerTitle: {
    fontWeight: '900',
    fontSize: 36,
  },
  close: {
    color: '#fff',
    fontSize: 20,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 64,
    paddingHorizontal: 16,
  },
})

export default TrailerModal
