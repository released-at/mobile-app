import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SelectReleaseType } from '../common/SelectReleaseType'
import { Releases } from '../common/Releases'
import { Release } from '../common/Release'
import { CalendarParamList } from '../../types/CalendarParamList'

const Stack = createStackNavigator<CalendarParamList>()

export const CalendarStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="SelectReleaseType">
      <Stack.Screen name="SelectReleaseType" component={SelectReleaseType} />
      <Stack.Screen name="Releases" component={Releases} />
      <Stack.Screen name="Release" component={Release} />
    </Stack.Navigator>
  )
}
