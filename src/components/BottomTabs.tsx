import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { Calendar, Archive, Me, Blog, Tinder } from '../stacks'
import { TabScreens } from '../types/screens'

const Tabs = createBottomTabNavigator<TabScreens>()

const BottomTabs: React.FC<{}> = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Calendar') {
            return <Feather name="calendar" size={size} color={color} />
          } else if (route.name === 'Archive') {
            return <Feather name="archive" size={size} color={color} />
          } else if (route.name === 'Blog') {
            return <Feather name="book-open" size={size} color={color} />
          } else if (route.name === 'Tinder') {
            return <Feather name="award" size={size} color={color} />
          } else if (route.name === 'Profile') {
            return <Feather name="user" size={size} color={color} />
          }
        },
        tabBarLabel: () => null,
      })}
      tabBarOptions={{
        activeTintColor: '#4287f5',
      }}
    >
      <Tabs.Screen name="Calendar" component={Calendar} />
      <Tabs.Screen name="Archive" component={Archive} />
      <Tabs.Screen name="Blog" component={Blog} />
      <Tabs.Screen name="Tinder" component={Tinder} />
      <Tabs.Screen name="Profile" component={Me} />
    </Tabs.Navigator>
  )
}

export default BottomTabs
