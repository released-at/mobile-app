import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Linking from 'expo-linking'
import Button from '../../components/Button'

interface Props {
  imdb: {
    link?: string
    rating?: number
  }
  kinopoisk: {
    link?: string
    rating?: number
  }
}

function FilmButtons({ imdb, kinopoisk }: Props) {
  if (!imdb.link && !kinopoisk.link) return null

  return (
    <View style={styles.wrapper}>
      {kinopoisk.link ? (
        <Button
          onPress={() => {
            if (kinopoisk.link) Linking.openURL(kinopoisk.link)
          }}
          extendedStyle={{
            button: () => [
              styles.button,
              { marginRight: 4, backgroundColor: '#f60' },
            ],
          }}
        >
          КиноПоиск{' '}
          {kinopoisk.rating && kinopoisk.rating > 0 && kinopoisk.rating}
        </Button>
      ) : null}
      {imdb.link ? (
        <Button
          onPress={() => {
            if (imdb.link) Linking.openURL(imdb.link)
          }}
          extendedStyle={{
            button: () => [
              styles.button,
              { marginLeft: 4, backgroundColor: '#f5c619' },
            ],
            text: {
              color: '#000',
            },
          }}
        >
          IMDb {imdb.rating && imdb.rating > 0 && imdb.rating}
        </Button>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
})

export default FilmButtons
