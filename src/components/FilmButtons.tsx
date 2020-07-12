import React from 'react'
import { View, Text, Linking, StyleSheet } from 'react-native'
import { Button } from './Button'
import { theme } from '../core/theme'

export const FilmButtons: React.FC<{
  kinopoiskUrl?: string
  imdbUrl: string
}> = ({ kinopoiskUrl, imdbUrl }) => {
  return (
    <View style={styles.container}>
      {kinopoiskUrl && (
        <Button
          styles={[styles.button, styles.kinopoisk]}
          onPress={() => {
            Linking.openURL(kinopoiskUrl)
          }}
        >
          <Text style={[styles.buttonTitle, styles.kpButtonTitle]}>
            КиноПоиск
          </Text>
        </Button>
      )}
      {imdbUrl && (
        <Button
          styles={[styles.button, styles.imdb]}
          onPress={() => {
            Linking.openURL(imdbUrl)
          }}
        >
          <Text style={styles.buttonTitle}>IMDb</Text>
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
    marginBottom: 16,
  },
  buttonTitle: {
    fontFamily: theme.fonts.rubik400,
    fontSize: 16,
  },
  kpButtonTitle: {
    color: theme.colors.white,
  },
  button: {
    margin: 4,
  },
  imdb: {
    backgroundColor: 'rgb(245, 197, 24)',
  },
  kinopoisk: {
    backgroundColor: '#f60',
  },
})
