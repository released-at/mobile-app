import React, { PropsWithChildren } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { theme } from '../core/theme'

interface Props {
  styles?: StyleProp<ViewStyle>
}

export const Button: React.FC<PropsWithChildren<
  Props & TouchableOpacityProps
>> = ({ children, styles, ...props }) => {
  return (
    <TouchableOpacity
      style={[defaultStyles.buttonBase, styles || {}]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}

const defaultStyles = StyleSheet.create({
  buttonBase: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 4,
    color: theme.colors.black,
    backgroundColor: theme.colors.buttonBg,
  },
})
