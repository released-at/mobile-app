import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Releases } from '../common/Releases'
import { Release } from '../common/Release'
import { mapTypesToRu } from '../../core/helpers'
import { CalendarParamList } from '../../types/CalendarParamList'

const Stack = createStackNavigator<CalendarParamList>()

export const CalendarStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="Releases">
      <Stack.Screen
        name="Releases"
        options={({ route }) => {
          // const { type } = route.params

          return {
            headerShown: false,
            cardStyle: {
              backgroundColor: 'rgb(11, 11, 11)',
            },
          }
        }}
        component={Releases}
      />
      <Stack.Screen
        options={() => ({
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
