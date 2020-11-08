import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Release from '../screens/Release'
import { CalendarScreens } from '../types/screens'

const Stack = createStackNavigator<CalendarScreens>()

const ReleaseStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="Release" headerMode="none">
      <Stack.Screen name="Release" component={Release} />
    </Stack.Navigator>
  )
}

export default ReleaseStack
