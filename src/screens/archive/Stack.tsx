import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SelectDate } from './SelectDate'
import { SelectReleaseType } from '../common/SelectReleaseType'
import { Releases } from '../common/Releases'
import { Release } from '../common/Release'
import { ArchiveParamList } from '../../types/ArchiveParamList'

const Stack = createStackNavigator<ArchiveParamList>()

export const ArchiveStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="SelectDate">
      <Stack.Screen name="SelectDate" component={SelectDate} />
      <Stack.Screen name="SelectReleaseType" component={SelectReleaseType} />
      <Stack.Screen name="Releases" component={Releases} />
      <Stack.Screen name="Release" component={Release} />
    </Stack.Navigator>
  )
}
