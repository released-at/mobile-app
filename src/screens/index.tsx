import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar, LogBox } from 'react-native'
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native'
import { ReactQueryCacheProvider, QueryCache, setConsole } from 'react-query'
import BottomTabs from '../components/BottomTabs'
import TrailerModal from '../screens/TrailerModal'

import { RootScreens } from '../types/screens'

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
})

LogBox.ignoreLogs(['Setting a timer'])

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0a0a0a',
    text: '#f5f5f5',
  },
}

const queryCache = new QueryCache()

const RootStack = createStackNavigator<RootScreens>()

const Root: React.FC = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <NavigationContainer theme={theme}>
        <StatusBar backgroundColor="#0a0a0a" />
        <RootStack.Navigator
          headerMode="none"
          mode="modal"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.85],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        >
          <RootStack.Screen name="Main" component={BottomTabs} />
          <RootStack.Screen name="TrailerModal" component={TrailerModal} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ReactQueryCacheProvider>
  )
}

export default Root
