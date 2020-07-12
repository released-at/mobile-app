import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { SelectDate } from './SelectDate'
import { SelectReleaseType } from '../common/SelectReleaseType'
import { Releases } from '../common/Releases'
import { Release } from '../common/Release'
import { mapTypesToRu } from '../../core/helpers'
import { ArchiveParamList } from '../../types/ArchiveParamList'

const Stack = createStackNavigator<ArchiveParamList>()

export const ArchiveStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="SelectDate">
      <Stack.Screen
        options={({ route }) => ({
          title: 'Архив',
          cardStyle: {
            backgroundColor: 'rgb(11, 11, 11)',
          },
          headerStyle: {
            backgroundColor: 'rgb(11, 11, 11)',
            shadowColor: 'rgb(77, 77, 77)',
          },
          headerTitleStyle: {
            color: '#f9f9f9',
          },
          headerTintColor: '#f9f9f9',
        })}
        name="SelectDate"
        component={SelectDate}
      />
      <Stack.Screen
        options={({ route }) => ({
          title:
            route.params.formattedDate.charAt(0).toUpperCase() +
            route.params.formattedDate.slice(1),
          cardStyle: {
            backgroundColor: 'rgb(11, 11, 11)',
          },
          headerStyle: {
            backgroundColor: 'rgb(11, 11, 11)',
            shadowColor: 'rgb(77, 77, 77)',
          },
          headerTitleStyle: {
            color: '#f9f9f9',
          },
          headerTintColor: '#f9f9f9',
        })}
        name="SelectReleaseType"
        component={SelectReleaseType}
      />
      <Stack.Screen
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
            shadowColor: 'transparent',
          }
        }}
        name="Releases"
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
