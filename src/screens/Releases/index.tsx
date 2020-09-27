import React, { useState, useCallback } from 'react'
import { ScrollView, Text, Button } from 'react-native'
import { ReleaseList } from '../../components'
import { toNextMonth, toPrevMonth } from '../../features/releases/utils'
import { useReleases } from '../../shared/hooks'
import { ReleaseTypes } from '../../types/releases'
import { MonthCalendarNumber, DateParams } from '../../types/common'

const currentMonth = (new Date().getMonth() + 1) as MonthCalendarNumber
const currentYear = new Date().getFullYear()

const Releases: React.FC = () => {
  const [date, changeDate] = useState<DateParams>({
    month: currentMonth,
    year: currentYear,
  })

  const films = useReleases(ReleaseTypes.Films, date)
  const games = useReleases(ReleaseTypes.Games, date)
  const series = useReleases(ReleaseTypes.Series, date)

  const next = useCallback(() => {
    changeDate(toNextMonth(date))
  }, [date])
  const prev = useCallback(() => {
    changeDate(toPrevMonth(date))
  }, [date])

  return (
    <ScrollView>
      {/* <Button title="next" onPress={next} />
      <Button title="prev" onPress={prev} /> */}
      {films.data && <ReleaseList type="films" releases={films.data} />}
      {games.data && <ReleaseList type="games" releases={games.data} />}
      {series.data && <ReleaseList type="series" releases={series.data} />}
    </ScrollView>
  )
}

export default Releases
