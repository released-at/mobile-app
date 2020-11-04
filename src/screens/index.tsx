import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ReactQueryCacheProvider, QueryCache, setConsole } from 'react-query'
import BottomTabs from '../components/BottomTabs'

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
})

const queryCache = new QueryCache()

const Root: React.FC = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </ReactQueryCacheProvider>
  )
}

export default Root
