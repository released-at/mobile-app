import React from 'react'
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Calendar, Archive, Me } from '../stacks'
import { TabScreens } from '../types/screens'

const Tabs = createBottomTabNavigator<TabScreens>()

const BottomTabs: React.FC<{}> = () => {
  return (
    <Tabs.Navigator
      tabBar={props => (
        <BlurView
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          tint="dark"
          intensity={100}
        >
          <BottomTabBar {...props} />
        </BlurView>
      )}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Calendar') {
            return <Feather name="calendar" size={size} color={color} />
          } else if (route.name === 'Archive') {
            return <Feather name="database" size={size} color={color} />
          } else if (route.name === 'Profile') {
            return <Feather name="user" size={size} color={color} />
          }
        },
        tabBarLabel: () => null,
      })}
      tabBarOptions={{
        style: {
          borderTopColor: 'rgb(77, 77, 77)',
          backgroundColor: 'transparent',
          height: 40,
          elevation: 0,
        },
        activeTintColor: '#4287f5',
      }}
    >
      <Tabs.Screen name="Calendar" component={Calendar} />
      <Tabs.Screen name="Archive" component={Archive} />
      <Tabs.Screen name="Profile" component={Me} />
    </Tabs.Navigator>
  )
}

export default BottomTabs
