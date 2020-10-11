import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Posts from '../screens/Posts'
import Post from '../screens/Post'
import { BlogScreens } from '../types/screens'

const Stack = createStackNavigator<BlogScreens>()

const Archive: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="Posts" headerMode="none">
      <Stack.Screen name="Posts" component={Posts} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  )
}

export default Archive
