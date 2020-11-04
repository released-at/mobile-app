import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native'
import {
  eachYearOfInterval,
  eachMonthOfInterval,
  addMonths,
  format,
} from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'

import { ArchiveStackNavProps } from '../../types/screens'

const interval = {
  start: new Date(2020, 0, 1),
  end: addMonths(new Date(), -1),
}

const yearsInterval = eachYearOfInterval(interval)

let archive: {
  [year: string]: { title: string; num: string }[]
} = {}

yearsInterval.forEach(date => {
  archive[format(date, 'yyyy')] = eachMonthOfInterval(interval).map(date => ({
    title: format(date, 'LLLL', { locale: ru }),
    num: format(date, 'M', { locale: ru }),
  }))
})

const SelectMonthInArchive: React.FC<ArchiveStackNavProps<'SelectMonth'>> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Архив</Text>
        <View>
          {Object.keys(archive).map(year => (
            <View style={styles.yearSection} key={year}>
              <Text style={styles.year}>{year}</Text>
              {archive[year].map(month => (
                <Pressable
                  key={month.num}
                  style={styles.monthButton}
                  onPress={() => {
                    navigation.navigate('Releases', {
                      month: month.num,
                      year,
                    })
                  }}
                >
                  <Text style={styles.month}>{month.title}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '900',
    fontSize: 36,
    marginVertical: 16,
  },
  yearSection: {
    marginBottom: 24,
  },
  year: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 12,
  },
  monthButton: {
    paddingVertical: 12,
  },
  month: {
    textTransform: 'capitalize',
    fontSize: 20,
  },
})

export default SelectMonthInArchive
