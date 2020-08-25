import React from 'react'
import { View } from 'react-native'
import { SvgUri } from 'react-native-svg'

export const EpicGamesStoreIcon: React.FC<{}> = () => {
  return (
    <View style={{ width: 24, height: 24 }}>
      <SvgUri
        width="100%"
        height="100%"
        viewBox="0 0 21 24"
        uri="https://released.at/icons/egs.svg"
      />
    </View>
  )
}
