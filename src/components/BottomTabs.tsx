import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SimpleLineIcons } from '@expo/vector-icons'
import { CalendarStack } from '../screens/calendar/Stack'
import { ArchiveStack } from '../screens/archive/Stack'
import { TabsParamList } from '../types/TabsParamList'

const Tabs = createBottomTabNavigator<TabsParamList>()

export const BottomTabs: React.FC<{}> = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Calendar') {
            return <SimpleLineIcons name="calendar" size={size} color={color} />
          } else if (route.name === 'Archive') {
            return <SimpleLineIcons name="folder" size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="Calendar" component={CalendarStack} />
      <Tabs.Screen name="Archive" component={ArchiveStack} />
    </Tabs.Navigator>
  )
}
