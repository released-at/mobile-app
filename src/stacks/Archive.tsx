import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SelectMonth from 'screens/SelectMonth'
import Releases from 'screens/Releases'
import Release from 'screens/Release'
import { ArchiveScreens } from 'types/screens'

const Stack = createStackNavigator<ArchiveScreens>()

const Calendar: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="SelectMonth">
      <Stack.Screen name="SelectMonth" component={SelectMonth} />
      <Stack.Screen name="Releases" component={Releases} />
      <Stack.Screen name="Release" component={Release} />
    </Stack.Navigator>
  )
}

export default Calendar
