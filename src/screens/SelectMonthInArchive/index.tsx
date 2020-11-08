import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import {
  eachYearOfInterval,
  eachMonthOfInterval,
  addMonths,
  format,
} from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import ScreenWrapper from '../../components/ScreenWrapper'
import Title from '../../components/Title'
import Text from '../../components/Text'

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
    <ScreenWrapper title="Архив">
      {Object.keys(archive).map(year => (
        <View style={styles.yearSection} key={year}>
          <Title h2>{year}</Title>
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
    </ScreenWrapper>
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
    marginTop: 16,
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
