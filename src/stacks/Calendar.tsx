import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Releases from '../screens/Releases'
import Release from '../screens/Release'
import Today from '../screens/Today'
import Post from '../screens/Post'

import { CalendarScreens } from '../types/screens'

const Stack = createStackNavigator<CalendarScreens>()

const Calendar: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="Releases" headerMode="none">
      <Stack.Screen name="Releases" component={Releases} />
      <Stack.Screen name="Release" component={Release} />
      <Stack.Screen name="Today" component={Today} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  )
}

export default Calendar
