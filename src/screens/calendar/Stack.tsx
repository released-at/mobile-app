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
          headerShown: false,
          cardStyle: {
            backgroundColor: 'rgb(11, 11, 11)',
          },
        }}
      />
      <Stack.Screen
        name="Releases"
        options={({ route }) => {
          const { type } = route.params

          return {
            title: mapTypesToRu(type),
            cardStyle: {
              backgroundColor: 'rgb(11, 11, 11)',
            },
            headerBackTitle: 'Назад',
            headerStyle: {
              backgroundColor: 'rgb(11, 11, 11)',
              shadowColor: 'rgb(77, 77, 77)',
            },
            headerTitleStyle: {
              color: '#f9f9f9',
            },
            headerTintColor: '#f9f9f9',
          }
        }}
        component={Releases}
      />
      <Stack.Screen
        options={({ route }) => ({
          title: '',
          cardStyle: {
            backgroundColor: 'rgb(11, 11, 11)',
          },
          headerTransparent: true,
          headerTintColor: '#f9f9f9',
        })}
        name="Release"
        component={Release}
      />
    </Stack.Navigator>
  )
}
