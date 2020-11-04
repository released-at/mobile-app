import React, { useState, useCallback } from 'react'
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import Header from './Header'
import ReleaseList from '../../components/ReleaseList'
import { toNextMonth, toPrevMonth } from '../../features/releases/utils'
import { useReleases } from '../../shared/hooks'
import { months } from '../../shared/constants'
import { ReleaseType } from '../../types/releases'
import { DateParams, MonthCalendarNumber } from '../../types/common'
import { CalendarStackNavProps } from '../../types/screens'

const currentMonth = months[new Date().getMonth()]
const currentYear = new Date().getFullYear()

const Releases: React.FC<CalendarStackNavProps<'Releases'>> = ({ route }) => {
  const {
    params = {
      month: currentMonth.calendarNumber as MonthCalendarNumber,
      year: currentYear,
    },
  } = route
  const [date, changeDate] = useState<DateParams>(params)

  const films = useReleases(ReleaseType.Films, date)
  const games = useReleases(ReleaseType.Games, date)
  const series = useReleases(ReleaseType.Series, date)

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
        {films.data ? (
          <ReleaseList type={ReleaseType.Films} releases={films.data} />
        ) : null}
        {games.data ? (
          <ReleaseList type={ReleaseType.Games} releases={games.data} />
        ) : null}
        {series.data ? (
          <ReleaseList type={ReleaseType.Series} releases={series.data} />
        ) : null}
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
