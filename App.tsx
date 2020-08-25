import React from 'react'
import { AppLoading } from 'expo'
import {
  Rubik_400Regular_Italic,
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
  useFonts,
} from '@expo-google-fonts/rubik'
import { Montserrat_200ExtraLight } from '@expo-google-fonts/montserrat'
import Root from 'screens'

function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular_Italic,
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
    Montserrat_200ExtraLight,
  })

  if (!fontsLoaded) return <AppLoading />

  return <Root />
}

export default App
