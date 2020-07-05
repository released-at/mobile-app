import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { format } from 'date-fns'
import { ArchiveStackNavProps } from '../../types/ArchiveParamList'

const startMonth = 1
const currentMonth = Number(format(new Date(), 'M'))

function range(start: number, end: number): number[] {
  const arr = []

  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr
}

export const SelectDate: React.FC<ArchiveStackNavProps<'SelectDate'>> = ({
  navigation,
}) => {
  return (
    <View>
      {range(startMonth, currentMonth).map(month => (
        <TouchableOpacity
          key={month}
          onPress={() => {
            navigation.navigate('SelectReleaseType', {
              date: `${month}-2020`,
            })
          }}
        >
          <Text>{format(new Date(2020, month - 1, 1), 'MMMM')}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
