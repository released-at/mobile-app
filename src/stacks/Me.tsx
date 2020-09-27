import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Me from '../screens/Me'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import { MeScreens } from '../types/screens'

const Stack = createStackNavigator<MeScreens>()

const MeStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="Me">
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Me" component={Me} />
    </Stack.Navigator>
  )
}

export default MeStack
