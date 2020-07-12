import React from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
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
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.year}>2020</Text>
        {range(startMonth, currentMonth).map(month => (
          <TouchableOpacity
            style={styles.month}
            key={month}
            onPress={() => {
              navigation.navigate('SelectReleaseType', {
                date: `${month}-2020`,
                formattedDate: format(
                  new Date(2020, month - 1, 1),
                  'LLLL yyyy',
                  {
                    locale: ru,
                  },
                ),
              })
            }}
          >
            <Text style={styles.monthTitle}>
              {format(new Date(2020, month - 1, 1), 'LLLL', { locale: ru })}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  year: {
    fontSize: 24,
    color: '#f9f9f9',
    fontWeight: 'bold',
    marginBottom: 18,
  },
  month: {
    paddingVertical: 12,
  },
  monthTitle: {
    textTransform: 'capitalize',
    fontSize: 16,
    color: '#f9f9f9',
  },
})
