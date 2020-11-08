import React, { PropsWithChildren } from 'react'
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface Props {
  src: string
  width?: number | string
  height?: number | string
  style?: StyleProp<ViewStyle>
}

function GradiendOnImage({
  src,
  width = 315,
  height = 220,
  style,
  children,
}: PropsWithChildren<Props>) {
  return (
    <View style={[{ width, height }, styles.wrapper, style]}>
      <LinearGradient
        colors={[
          'transparent',
          'rgba(0, 0, 0, 0.25)',
          'rgba(0, 0, 0, 0.5)',
          'rgba(0, 0, 0, 0.9)',
        ]}
        style={[styles.gradient, { width, height }]}
      />
      <Image style={styles.image} source={{ uri: src, cache: 'default' }} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})

export default GradiendOnImage
