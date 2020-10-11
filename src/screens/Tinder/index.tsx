import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'
import Swiper from './Swiper'
import * as api from '../../shared/api'
import { endpoints } from '../../shared/constants'

function Tinder() {
  const { data: films } = useQuery(endpoints.FILMS, api.films)

  if (!films) return null

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Выберите{'\n'}фильм</Text>
      <Swiper films={films} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  title: {
    fontWeight: '900',
    fontSize: 36,
    marginVertical: 16,
    paddingHorizontal: 16,
  },
})

export default Tinder
