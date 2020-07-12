import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { format } from 'date-fns'
import { CalendarStackNavProps } from '../../types/CalendarParamList'

export const SelectReleaseType: React.FC<CalendarStackNavProps<
  'SelectReleaseType'
>> = ({ navigation, route }) => {
  const date = route.params?.date || format(new Date(), 'M-yyyy')

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Releases', {
            type: 'movies',
            date,
          })
        }}
      >
        <Text style={styles.text}>Кино</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Releases', {
            type: 'serials',
            date,
          })
        }}
      >
        <Text style={styles.text}>Сериалы</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Releases', {
            type: 'games',
            date,
          })
        }}
      >
        <Text style={styles.text}>Игры</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    color: '#f9f9f9',
    fontFamily: 'Rubik_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
})
