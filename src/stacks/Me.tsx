import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Releases from 'screens/Releases'
import Release from 'screens/Release'
import { MeScreens } from 'types/screens'

const Stack = createStackNavigator<MeScreens>()

const MeStack: React.FC<{}> = () => {
  return (
    <Stack.Navigator initialRouteName="Me">
      <Stack.Screen name="SignUp" component={Releases} />
      <Stack.Screen name="SignIn" component={Release} />
      <Stack.Screen name="Me" component={Releases} />
    </Stack.Navigator>
  )
}

export default MeStack
