import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getFont } from '../shared/utils'

import { GamePlatform } from '../types/releases'

interface PlatformProps {
  platform: GamePlatform
}

const platformDict = {
  pc: { title: 'PC', color: '#fff', bgColor: '#000' },
  ps_4: { title: 'PS4', color: '#fff', bgColor: '#003087' },
  ps_5: { title: 'PS5', color: '#fff', bgColor: '#003087' },
  xbox_one: { title: 'Xbox One', color: '#000', bgColor: '#52b043' },
  xbox_series: { title: 'Xbox Series', color: '#000', bgColor: '#52b043' },
  nintendo_switch: { title: 'Switch', color: '#000', bgColor: '#e60012' },
}

const Platform = ({ platform }: PlatformProps) => {
  const { bgColor, color, title } = platformDict[platform]

  return (
    <View style={[{ backgroundColor: bgColor }, styles.platform]}>
      <Text style={[{ color }, styles.title]}>{title}</Text>
    </View>
  )
}

const GamePlatformList = ({ platforms }: { platforms: GamePlatform[] }) => {
  return (
    <View style={styles.container}>
      {platforms.map(platform => (
        <Platform key={platform} platform={platform} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
  platform: {
    margin: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: getFont('primary', 600),
  },
})

export default GamePlatformList
