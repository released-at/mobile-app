import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Tinder from '../screens/Tinder'
import Release from '../screens/Release'
import { TinderScreens } from '../types/screens'

const Stack = createStackNavigator<TinderScreens>()

const Archive: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="Tinder" headerMode="none">
      <Stack.Screen name="Tinder" component={Tinder} />
      <Stack.Screen name="Release" component={Release} />
    </Stack.Navigator>
  )
}

export default Archive
