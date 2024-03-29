import React from 'react'
import { View, StyleSheet } from 'react-native'
import Text from '../../components/Text'

interface Props {
  label: string
  color: string
}

const OverlayLabel = ({ label, color }: Props) => (
  <View style={[styles.overlayLabel, { borderColor: color }]}>
    <Text style={[styles.overlayLabelText, { color }]}>{label}</Text>
  </View>
)

const styles = StyleSheet.create({
  overlayLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  overlayLabelText: {
    fontSize: 25,
    textAlign: 'center',
  },
})

export default OverlayLabel
