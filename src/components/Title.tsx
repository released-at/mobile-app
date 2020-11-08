import React, { PropsWithChildren } from 'react'
import { Text, StyleSheet, StyleProp, TextStyle, TextProps } from 'react-native'
import { getFont } from '../shared/utils'

interface Props {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  style?: StyleProp<TextStyle>
}

const Title = ({
  children,
  h1 = true,
  h2,
  h3,
  h4,
  h5,
  h6,
  style,
  ...rest
}: PropsWithChildren<Props & TextProps>) => {
  if (h2) {
    return (
      <Text {...rest} style={[styles.base, styles.h2, style]}>
        {children}
      </Text>
    )
  }

  if (h3) {
    return (
      <Text {...rest} style={[styles.base, styles.h3, style]}>
        {children}
      </Text>
    )
  }

  if (h4) {
    return (
      <Text {...rest} style={[styles.base, styles.h4, style]}>
        {children}
      </Text>
    )
  }

  if (h5) {
    return (
      <Text {...rest} style={[styles.base, styles.h5, style]}>
        {children}
      </Text>
    )
  }

  if (h6) {
    return (
      <Text {...rest} style={[styles.base, styles.h6, style]}>
        {children}
      </Text>
    )
  }

  return (
    <Text {...rest} style={[styles.base, styles.h1, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  base: {
    color: '#f5f5f5',
  },

  h1: {
    marginBottom: 16,
    fontFamily: getFont('primary', 800),
    fontSize: 36,
    lineHeight: 36 * 1.125,
    letterSpacing: -1.07,
  },
  h2: {
    marginBottom: 12,
    fontFamily: getFont('primary', 800),
    fontSize: 24,
    lineHeight: 24 * 1.4,
    letterSpacing: -0.33,
  },
  h3: {
    marginBottom: 12,
    fontFamily: getFont('primary', 600),
    fontSize: 20,
    lineHeight: 20 * 1.25,
    letterSpacing: -0.47,
  },
  h4: {
    marginBottom: 12,
    fontFamily: getFont('primary', 600),
    fontSize: 16,
    lineHeight: 16 * 1.5,
    letterSpacing: -0.33,
  },
  h5: {
    marginBottom: 12,
    fontFamily: getFont('primary', 600),
    fontSize: 14,
    lineHeight: 14 * 1.5,
    letterSpacing: -0.18,
  },
  h6: {
    marginBottom: 8,
    fontFamily: getFont('primary', 600),
    fontSize: 12,
    lineHeight: 12 * 1.5,
    letterSpacing: -0.09,
  },
})

export default Title
