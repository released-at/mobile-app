import React, { PropsWithChildren } from 'react'
import {
  Text as RNText,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextProps,
} from 'react-native'
import { getFont } from '../shared/utils'

interface Props {
  style?: StyleProp<TextStyle>
  secondary?: boolean
  fontWeight?: 400 | 600 | 700 | 800
  italic?: boolean
  withMarginBottom?: boolean
}

const Text = ({
  children,
  style,
  secondary,
  fontWeight = 400,
  italic = false,
  withMarginBottom = false,
  ...rest
}: PropsWithChildren<Props & TextProps>) => {
  return (
    <RNText
      {...rest}
      style={[
        styles.base,
        {
          marginBottom: withMarginBottom ? 8 : 0,
          fontFamily: secondary
            ? getFont('secondary', fontWeight, italic)
            : getFont('primary', fontWeight, italic),
        },
        style,
      ]}
    >
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    lineHeight: 16 * 1.5,
    color: '#f5f5f5',
  },
  primary: {
    fontFamily: getFont('primary', 400),
  },
  secondary: {
    fontFamily: getFont('secondary', 400),
  },
})

export default Text
