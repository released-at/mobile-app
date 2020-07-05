import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabs } from './components/BottomTabs'

export const Main: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  )
}