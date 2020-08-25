import React from 'react'
import { View } from 'react-native'
import { SvgUri } from 'react-native-svg'

export const GOGIcon: React.FC<{}> = () => {
  return (
    <View style={{ width: 24, height: 24 }}>
      <SvgUri
        width="100%"
        height="100%"
        viewBox="0 0 23 22"
        uri="https://released.at/icons/gog.svg"
      />
    </View>
  )
}
