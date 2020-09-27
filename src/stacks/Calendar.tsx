import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Releases from '../screens/Releases'
import Release from '../screens/Release'
import { CalendarScreens } from '../types/screens'

const Stack = createStackNavigator<CalendarScreens>()

const Calendar: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="Releases">
      <Stack.Screen name="Releases" component={Releases} />
      <Stack.Screen name="Release" component={Release} />
    </Stack.Navigator>
  )
}

export default Calendar
