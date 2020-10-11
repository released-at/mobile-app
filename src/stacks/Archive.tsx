import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SelectMonthInArchive from '../screens/SelectMonthInArchive'
import Releases from '../screens/Releases'
import Release from '../screens/Release'
import { ArchiveScreens } from '../types/screens'

const Stack = createStackNavigator<ArchiveScreens>()

const Archive: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="SelectMonth" headerMode="none">
      <Stack.Screen name="SelectMonth" component={SelectMonthInArchive} />
      <Stack.Screen name="Releases" component={Releases} />
      <Stack.Screen name="Release" component={Release} />
    </Stack.Navigator>
  )
}

export default Archive
