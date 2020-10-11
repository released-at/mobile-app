import React from 'react'
import { ActivityIndicator } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Me from '../screens/Me'
import SignUp from '../screens/SignUp'
import Release from '../screens/Release'
import { MeScreens } from '../types/screens'
import { useUser } from '../features/user/use-user'

const Stack = createStackNavigator<MeScreens>()

const MeStack: React.FC<{}> = () => {
  const { user, isLoading } = useUser()

  if (isLoading) return <ActivityIndicator size="large" />

  return (
    <Stack.Navigator headerMode="none">
      {user ? (
        <>
          <Stack.Screen name="Me" component={Me} />
          <Stack.Screen name="Release" component={Release} />
        </>
      ) : (
        <Stack.Screen name="SignUp" component={SignUp} />
      )}
    </Stack.Navigator>
  )
}

export default MeStack
