import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Swiper from './Swiper'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import Title from '../../components/Title'
import { useFilms } from '../../features/releases/use-films'

function Tinder() {
  const { films } = useFilms()

  if (!films) return null

  return (
    <SafeAreaView style={styles.safe}>
      <FocusAwareStatusBar backgroundColor="#0b0b0b" />
      <Title style={styles.title} h1>
        Кинотиндер
      </Title>
      <Swiper films={films} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  title: {
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
  },
})

export default Tinder
