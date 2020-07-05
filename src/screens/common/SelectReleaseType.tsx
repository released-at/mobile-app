import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { format } from 'date-fns'
import { CalendarStackNavProps } from '../../types/CalendarParamList'

export const SelectReleaseType: React.FC<CalendarStackNavProps<
  'SelectReleaseType'
>> = ({ navigation, route }) => {
  const date = route.params?.date || format(new Date(), 'M-yyyy')

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Releases', {
            type: 'movies',
            date,
          })
        }}
      >
        <Text>Movies</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Releases', {
            type: 'games',
            date,
          })
        }}
      >
        <Text>Games</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Releases', {
            type: 'serials',
            date,
          })
        }}
      >
        <Text>Serials</Text>
      </TouchableOpacity>
    </View>
  )
}
