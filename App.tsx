import React from 'react'
import { AppLoading } from 'expo'
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter'
import {
  PTSerif_400Regular,
  PTSerif_400Regular_Italic,
  PTSerif_700Bold,
} from '@expo-google-fonts/pt-serif'
import Root from './src/screens'

function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_800ExtraBold,
    PTSerif_400Regular,
    PTSerif_400Regular_Italic,
    PTSerif_700Bold,
  })

  if (!fontsLoaded) return <AppLoading />

  return <Root />
}

export default App
