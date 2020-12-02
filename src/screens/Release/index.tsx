import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  View,
  Dimensions,
  Pressable,
  StyleSheet,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import * as Linking from 'expo-linking'
import FilmButtons from './FilmButtons'
import GameStoreButtons from './GameStoreButtons'
import Articles from './Articles'
import FocusAwareStatus from '../../components/FocusAwareStatusBar'
import GamePlatformList from '../../components/GamePlatformList'
import ExpectButton from '../../components/ExpectButton'
import Text from '../../components/Text'
import Title from '../../components/Title'
import { getFont } from '../../shared/utils'
import { useRelease } from '../../features/releases/use-release'

import { CalendarStackNavProps } from '../../types/screens'
import { ReleaseType, PlatformSlug } from '../../types/releases'

const windowHeight = Dimensions.get('window').height

function Play() {
  return (
    <Svg viewBox="0 0 25 25" width={64} height={64}>
      <Path
        d="M12.5 0A12.5 12.5 0 1025 12.5 12.52 12.52 0 0012.5 0zm5.26 12.92l-8 5a.56.56 0 01-.26.08.5.5 0 01-.24-.06.51.51 0 01-.26-.44v-10a.51.51 0 01.26-.44.49.49 0 01.51 0l8 5a.49.49 0 010 .84z"
        fill="#f5f5f5"
      />
    </Svg>
  )
}

const mcRatingDict = {
  [PlatformSlug.PC]: { title: 'PC', color: '#fff', bgColor: '#000' },
  [PlatformSlug.PS4]: { title: 'PS4', color: '#fff', bgColor: '#003087' },
  [PlatformSlug.PS5]: { title: 'PS5', color: '#fff', bgColor: '#003087' },
  [PlatformSlug.XboxOne]: {
    title: 'Xbox One',
    color: '#000',
    bgColor: '#52b043',
  },
  [PlatformSlug.XboxSeries]: {
    title: 'Xbox Series',
    color: '#000',
    bgColor: '#52b043',
  },
  [PlatformSlug.NintendoSwitch]: {
    title: 'Switch',
    color: '#000',
    bgColor: '#e60012',
  },
}

const Release: React.FC<CalendarStackNavProps<'Release'>> = ({
  route,
  navigation,
}) => {
  const { id } = route.params
  const { release } = useRelease(id)

  if (!release) return null

  return (
    <SafeAreaView style={styles.safe}>
      <FocusAwareStatus
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0, 0, 0, 0)"
      />
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
        <Pressable
          onPress={() => {
            navigation.navigate('TrailerModal', {
              url: release.trailer,
            })
          }}
        >
          <>
            <View style={styles.playIcon}>
              <Play />
            </View>
            <LinearGradient
              colors={['transparent', '#0b0b0b']}
              style={styles.coverGradient}
            />
            <ImageBackground
              source={{ uri: release.cover }}
              style={styles.cover}
            ></ImageBackground>
          </>
        </Pressable>
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
          {release.type === ReleaseType.Games &&
            release.metacritic_ratings.length > 0 && (
              <View style={styles.mcRatings}>
                <Text style={{ marginBottom: 2 }} fontWeight={600}>
                  Metacritic:
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    margin: -4,
                  }}
                >
                  {release.metacritic_ratings.map(rating => (
                    <Pressable
                      style={{
                        borderRadius: 4,
                        margin: 4,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        backgroundColor: mcRatingDict[rating.platform].bgColor,
                      }}
                      key={rating.url}
                      onPress={() => {
                        Linking.openURL(rating.url)
                      }}
                    >
                      <Text
                        style={{ color: mcRatingDict[rating.platform].color }}
                      >
                        {mcRatingDict[rating.platform].title} {rating.score}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          <View style={styles.desc}>
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
            {release.type === ReleaseType.Games && (
              <GameStoreButtons stores={release.stores} />
            )}
            {release.articles.length ? (
              <Articles articles={release.articles} />
            ) : null}
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
    top: Constants.statusBarHeight + 8,
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
  mcRatings: {
    marginBottom: 16,
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
