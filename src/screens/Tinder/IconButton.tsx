import React from 'react'
import { GestureResponderEvent } from 'react-native'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

interface Props {
  onPress: (event: GestureResponderEvent) => void
  name: string
  backgroundColor: string
  color: string
}

const IconButton = ({ onPress, name, backgroundColor, color }: Props) => (
  <TouchableOpacity
    style={[styles.singleButton, { backgroundColor }]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <AntDesign name={name} size={20} color={color} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  singleButton: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    padding: 15,
  },
})

export default IconButton
