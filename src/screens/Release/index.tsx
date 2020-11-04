import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  View,
  Dimensions,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import YoutubePlayer from 'react-native-youtube-iframe'
import getYoutubeId from 'get-youtube-id'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import { LinearGradient } from 'expo-linear-gradient'
import FilmButtons from './FilmButtons'
import GamePlatformList from '../../components/GamePlatformList'
import ExpectButton from '../../components/ExpectButton'
import Text from '../../components/Text'
import Title from '../../components/Title'
import { getFont } from '../../shared/utils'
import { useRelease } from '../../features/releases/use-release'

import { CalendarStackNavProps } from '../../types/screens'
import { ReleaseType } from '../../types/releases'

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

const Release: React.FC<CalendarStackNavProps<'Release'>> = ({ route }) => {
  const [showTrailer, setShowTrailer] = useState(false)
  const { id } = route.params
  const { release } = useRelease(id)

  if (!release) return null

  const youtubeId = getYoutubeId(release.trailer)

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.releaseDate}>
            <Text style={styles.date}>
              {format(new Date(release.released), 'EEEEEE, d MMM', {
                locale: ru,
              })}
            </Text>
          </View>
          <ExpectButton release={release} />
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
            <Title h1 style={styles.title}>
              {release.title}
            </Title>
            {release.type === ReleaseType.Films && (
              <Title h2 style={styles.originalTitle}>
                {release.original_title}
              </Title>
            )}
          </View>
          <View style={styles.info}>
            {release.type === ReleaseType.Films && (
              <Text style={styles.extra}>
                <Text fontWeight={600}>Режиссёр:</Text> {release.director}
              </Text>
            )}
            {release.type === ReleaseType.Games && (
              <GamePlatformList platforms={release.platforms} />
            )}
            {release.type === ReleaseType.Series && (
              <Text style={styles.extra}>
                <Text fontWeight={600}>Сезон:</Text> {release.season}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.desc}>{release.description}</Text>
            {(release.type === ReleaseType.Films ||
              release.type === ReleaseType.Series) && (
              <FilmButtons
                imdb={{
                  link: release.kinopoisk_url,
                  rating:
                    release.type === ReleaseType.Films
                      ? release.ratings.imdb
                      : undefined,
                }}
                kinopoisk={{
                  link: release.imdb_url,
                  rating:
                    release.type === ReleaseType.Films
                      ? release.ratings.kinopoisk
                      : undefined,
                }}
              />
            )}
          </View>
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
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    ...Platform.select({
      ios: {
        top: 16,
      },
      android: {
        top: 28,
      },
    }),
  },
  releaseDate: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
  date: {
    fontFamily: getFont('primary', 600),
    color: '#fff',
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
    marginBottom: 0,
  },
  originalTitle: {
    marginBottom: 0,
    color: '#7e8a97',
  },
  extra: {
    fontSize: 16,
  },
  desc: {
    marginBottom: 24,
  },
  filmButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filmButton: {
    flex: 1,
  },
})

export default Release
