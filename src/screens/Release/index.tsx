import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Modal,
  StyleSheet,
} from 'react-native'
import { useQuery } from 'react-query'
import Svg, { Path } from 'react-native-svg'
import YoutubePlayer from 'react-native-youtube-iframe'
import getYoutubeId from 'get-youtube-id'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import { LinearGradient } from 'expo-linear-gradient'
import GamePlatformList from '../../components/GamePlatformList'
import ExpectButton from '../../components/ExpectButton'
import * as api from '../../shared/api'
import { ifElse } from '../../shared/utils'
import { endpoints } from '../../shared/constants'

const windowHeight = Dimensions.get('window').height

function Play() {
  return (
    <Svg viewBox="0 0 25 25" width={64} height={64}>
      <Path
        d="M12.5 0A12.5 12.5 0 1025 12.5 12.52 12.52 0 0012.5 0zm5.26 12.92l-8 5a.56.56 0 01-.26.08.5.5 0 01-.24-.06.51.51 0 01-.26-.44v-10a.51.51 0 01.26-.44.49.49 0 01.51 0l8 5a.49.49 0 010 .84z"
        fill="#111"
      />
    </Svg>
  )
}

const Release: React.FC = ({ route }) => {
  const [showTrailer, setShowTrailer] = useState(false)
  const { id } = route.params
  const { data: release } = useQuery(endpoints.RELEASE(id), () =>
    api.release(id),
  )

  if (!release) return null

  const youtubeId = getYoutubeId(release?.trailer_url || '')

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.releaseDate}>
            <Text style={styles.date}>
              {format(new Date(release.released), 'd MMM, EEEEEE', {
                locale: ru,
              })}
            </Text>
          </View>
          <ExpectButton
            style={styles.expect}
            type={release.type}
            release={{ ...release, release_id: id }}
          />
        </View>
        <TouchableHighlight
          onPress={() => {
            setShowTrailer(true)
          }}
        >
          <>
            <View style={styles.playIcon}>
              <Play />
            </View>
            <LinearGradient
              colors={['transparent', 'rgb(242, 242, 242)']}
              style={styles.coverGradient}
            />
            <ImageBackground
              source={{ uri: release.cover }}
              style={styles.cover}
            ></ImageBackground>
          </>
        </TouchableHighlight>
        <Modal animationType="slide" visible={showTrailer} statusBarTranslucent>
          {youtubeId && (
            <SafeAreaView style={styles.safe}>
              <View style={styles.trailer}>
                <View style={styles.trailerHeader}>
                  <TouchableHighlight
                    onPress={() => {
                      setShowTrailer(false)
                    }}
                  >
                    <Text style={styles.close}>Закрыть</Text>
                  </TouchableHighlight>
                </View>
                <YoutubePlayer
                  height={270}
                  videoId={youtubeId}
                  initialPlayerParams={{}}
                />
              </View>
            </SafeAreaView>
          )}
        </Modal>
        <View style={styles.content}>
          <View style={styles.titles}>
            <Text style={styles.title}>{release.title}</Text>
            {ifElse(
              release.original_title,
              <Text style={styles.originalTitle}>
                {release.original_title}
              </Text>,
            )}
          </View>
          <View style={styles.info}>
            {ifElse(
              release.type === 'movie',
              <Text style={styles.extra}>
                <Text style={styles.semiBold}>Режиссёр</Text> {release.director}
              </Text>,
            )}
            {ifElse(
              release.type === 'game',
              <GamePlatformList platforms={release.platforms} />,
            )}
            {ifElse(
              release.type === 'serial',
              <Text style={styles.extra}>
                <Text style={styles.semiBold}>Сезон</Text> {release.season}
              </Text>,
            )}
          </View>
          <Text style={styles.desc}>{release.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const vh30 = windowHeight * 0.3

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    paddingHorizontal: 16,
    top: 16,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  releaseDate: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  trailer: {
    flex: 1,
    backgroundColor: '#000',
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
  date: {
    fontWeight: 'bold',
  },
  cover: {
    width: '100%',
    height: vh30,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    height: vh30,
    zIndex: 1,
  },
  playIcon: {
    position: 'absolute',
    zIndex: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: vh30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  content: {
    paddingHorizontal: 16,
  },
  titles: {
    marginVertical: 8,
  },
  info: {
    marginBottom: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
  },
  originalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7e8a97',
    marginTop: 2,
  },
  desc: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  extra: {
    fontSize: 16,
  },
  semiBold: {
    fontWeight: '600',
  },
})

export default Release
