import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { SelectReleaseType } from '../common/SelectReleaseType'
import { Releases } from '../common/Releases'
import { Release } from '../common/Release'
import { mapTypesToRu } from '../../core/helpers'
import { CalendarParamList } from '../../types/CalendarParamList'

const Stack = createStackNavigator<CalendarParamList>()

export const CalendarStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="SelectReleaseType">
      <Stack.Screen
        name="SelectReleaseType"
        component={SelectReleaseType}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Releases"
        options={({ route }) => {
          const { type, date } = route.params
          const [month, year] = date.split('-')

          return {
            title: `${mapTypesToRu(type)} | ${format(
              new Date(+year, +month - 1, 1),
              'LLLL yyyy',
              { locale: ru },
            )}`,
          }
        }}
        component={Releases}
      />
      <Stack.Screen name="Release" component={Release} />
    </Stack.Navigator>
  )
}
