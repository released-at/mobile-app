import React, { PropsWithChildren } from 'react'
import {
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  PressableStateCallbackType,
} from 'react-native'
import Text from './Text'

interface Props {
  extendedStyle?: {
    button?: (state: PressableStateCallbackType) => StyleProp<ViewStyle>
    text?: StyleProp<TextStyle>
  }
  withOnlyText?: boolean
}

const Button = ({
  children,
  extendedStyle,
  withOnlyText = true,
  ...rest
}: PropsWithChildren<Props & PressableProps>) => {
  return (
    <Pressable
      {...rest}
      style={state => {
        return [
          styles.button,
          extendedStyle && extendedStyle.button && extendedStyle.button(state),
        ]
      }}
    >
      {withOnlyText ? (
        <Text style={[styles.text, extendedStyle?.text]} fontWeight={600}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b79f3',
    borderRadius: 8,
    height: 40,
  },
  text: {
    color: '#efefef',
  },
})

export default Button
