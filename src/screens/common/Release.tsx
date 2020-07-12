import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  View,
  ActivityIndicator,
  Image,
  Text,
  StyleSheet,
} from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import getYoutubeId from 'get-youtube-id'
import { LinearGradient } from 'expo-linear-gradient'
import { format, parseISO } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { StoreButtons } from '../../components/StoreButtons'
import { FilmButtons } from '../../components/FilmButtons'
import { api } from '../../core/api'
import { theme } from '../../core/theme'
import { CalendarStackNavProps } from '../../types/CalendarParamList'
import { Release as ReleaseType } from '../../types/Release'

const rgb = '11, 11, 11'

export const Release: React.FC<CalendarStackNavProps<'Release'>> = ({
  route: {
    params: { id },
  },
}) => {
  const [release, setRelease] = useState<ReleaseType | null>(null)

  useEffect(() => {
    async function fetchRelease() {
      const release = await api.release({ id })
      setRelease(release)
    }

    fetchRelease()
  }, [id])

  function renderInfo() {
    if (release === null) return

    if (release.type === 'movie')
      return (
        <View>
          <Text style={styles.infoLabel}>
            Режиссер: <Text style={styles.infoValue}>{release.director}</Text>
          </Text>
        </View>
      )

    if (release.type === 'game')
      return (
        <View>
          <Text style={styles.infoLabel}>
            Платформы:{' '}
            <Text style={styles.infoValue}>
              {release.platforms
                .map(platform => {
                  switch (platform) {
                    case 'pc':
                      return 'PC'
                    case 'ps_4':
                      return 'PlayStation 4'
                    case 'xbox_one':
                      return 'Xbox One'
                    case 'nintendo_switch':
                      return 'Nintendo Switch'
                    default:
                      return ''
                  }
                })
                .join(', ')}
            </Text>
          </Text>
          {release?.rawg_io_fields?.genres ? (
            <Text style={styles.infoLabel}>
              Жанры:{' '}
              <Text style={styles.infoValue}>
                {release.rawg_io_fields.genres
                  .map((genre: any) => genre.name)
                  .join(', ')}
              </Text>
            </Text>
          ) : null}
        </View>
      )

    if (release.type === 'serial')
      return (
        <View>
          {release.director ? (
            <Text style={styles.infoLabel}>
              Режиссер: <Text style={styles.infoValue}>{release.director}</Text>
            </Text>
          ) : null}
          <Text style={styles.infoLabel}>
            Сезон: <Text style={styles.infoValue}>{release.season}</Text>
          </Text>
        </View>
      )
  }

  const youtubeId = getYoutubeId(release?.trailer_url || '')

  return release ? (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: release.cover }} style={styles.cover} />
      <LinearGradient
        colors={[
          `rgba(${rgb}, 0)`,
          `rgba(${rgb}, 0.04)`,
          `rgba(${rgb}, 0.09)`,
          `rgba(${rgb}, 0.78)`,
          `rgba(${rgb}, 0.86)`,
          `rgba(${rgb}, 0.94)`,
          `rgba(${rgb}, 1)`,
        ]}
        locations={[0, 0.14, 0.28, 0.8, 0.85, 0.91, 0.96]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <View style={styles.releaseDateWrapper}>
          <Text style={styles.releaseDate}>
            {format(parseISO(release.released), 'd MMM yyyy Г.', {
              locale: ru,
            })}
          </Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{release.title}</Text>
          {release.type === 'movie' && release.original_title && (
            <Text style={styles.originalTitle}>{release.original_title}</Text>
          )}
        </View>
        <Text style={styles.about}>{release.description.trim()}</Text>
        <View style={styles.info}>{renderInfo()}</View>
        {(release.type === 'movie' || release.type === 'serial') && (
          <FilmButtons
            imdbUrl={release.imdb_url}
            kinopoiskUrl={release.kinopoisk_url}
          />
        )}
        {release.type === 'game' && (
          <StoreButtons
            stores={release.stores}
            rawgStores={release?.rawg_io_fields?.stores}
          />
        )}
        {youtubeId && (
          <View style={styles.trailerContainer}>
            <YoutubePlayer
              height={200}
              videoId={youtubeId}
              initialPlayerParams={{}}
            />
          </View>
        )}
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator size="large" />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  content: {
    marginTop: -48,
    marginHorizontal: 16,
  },
  cover: {
    width: '100%',
    height: 220,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 220,
  },
  releaseDateWrapper: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginVertical: 8,
    backgroundColor: theme.colors.white,
    borderRadius: 4,
  },
  releaseDate: {
    color: theme.colors.black,
    fontFamily: theme.fonts.rubik400,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titleWrapper: {
    marginBottom: 12,
  },
  title: {
    color: theme.colors.primaryText,
    fontSize: 28,
    fontFamily: theme.fonts.rubik700,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    lineHeight: 28 * 1.3,
  },
  originalTitle: {
    color: theme.colors.secondaryText,
    fontSize: 18,
    fontFamily: theme.fonts.rubik700,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  about: {
    color: theme.colors.primaryText,
    fontFamily: theme.fonts.rubik400,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    marginBottom: 16,
  },
  info: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    lineHeight: 18,
    color: theme.colors.secondaryText,
    fontFamily: theme.fonts.rubik400,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: theme.colors.primaryText,
    fontFamily: theme.fonts.rubik400,
  },
  trailerContainer: {
    height: 200,
    borderRadius: 4,
    overflow: 'hidden',
  },
})
