import React, { useState, useCallback } from 'react'
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import Header from './Header'
import { ReleaseList } from '../../components'
import { toNextMonth, toPrevMonth } from '../../features/releases/utils'
import { useReleases } from '../../shared/hooks'
import { months } from '../../shared/constants'
import { ReleaseTypes } from '../../types/releases'
import { DateParams, MonthCalendarNumber } from '../../types/common'

const currentMonth = months[new Date().getMonth()]
const currentYear = new Date().getFullYear()

const Releases: React.FC = ({ navigation, route }) => {
  const {
    params = {
      month: currentMonth.calendarNumber as MonthCalendarNumber,
      year: currentYear,
    },
  } = route
  const [date, changeDate] = useState<DateParams>(params)

  const films = useReleases(ReleaseTypes.Films, date)
  const games = useReleases(ReleaseTypes.Games, date)
  const series = useReleases(ReleaseTypes.Series, date)

  const next = useCallback(() => {
    changeDate(toNextMonth(date))
  }, [date])
  const prev = useCallback(() => {
    changeDate(toPrevMonth(date))
  }, [date])
  const current = useCallback(() => {
    changeDate({
      month: currentMonth.calendarNumber as MonthCalendarNumber,
      year: currentYear,
    })
  }, [])

  return (
    <SafeAreaView style={styles.safe}>
      <Header
        month={months[date.month - 1]}
        year={date.year}
        toNext={next}
        toPrev={prev}
        toCurrent={current}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {films.data && (
          <ReleaseList
            type="films"
            releases={films.data}
            navigation={navigation}
          />
        )}
        {games.data && (
          <ReleaseList
            type="games"
            releases={games.data}
            navigation={navigation}
          />
        )}
        {series.data && (
          <ReleaseList
            type="series"
            releases={series.data}
            navigation={navigation}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    paddingLeft: 16,
  },
})

export default Releases
