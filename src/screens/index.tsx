import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { BottomTabs } from 'components'

const Root: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  )
}

export default Root
