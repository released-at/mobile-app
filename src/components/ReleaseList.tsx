import React, { useState, useEffect } from 'react'
import {
  SectionList,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { compareAsc, format, parseISO } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { ReleaseCard } from './ReleaseCard'
import { api } from '../core/api'
import { groupBy, getNextAndPrevDate } from '../core/helpers'
import { theme } from '../core/theme'
import { ReleaseTypes } from '../types/ReleaseTypes'

interface Props {
  type: keyof typeof ReleaseTypes
  date: string
  openRelease: (id: string, title: string) => void
  changeMonth: (type: keyof typeof ReleaseTypes, date: string) => void
}

export const ReleaseList: React.FC<Props> = ({
  type,
  openRelease,
  changeMonth,
  date,
}) => {
  const [releases, setReleases] = useState([])

  useEffect(() => {
    async function fetchReleases() {
      const releases = await api.releases({
        type,
        date,
      })
      setReleases(releases)
    }

    fetchReleases()
  }, [type, date])

  if (!releases.length) return <ActivityIndicator size="large" />

  const data = releases.sort((a: any, b: any) =>
    compareAsc(new Date(a.released), new Date(b.released)),
  )
  const preparedReleases = Object.keys(groupBy('released')(data)).map(key => ({
    title: key,
    data: groupBy('released')(data)[key],
  }))

  const [month, year] = date.split('-')
  const currentMonth = new Date().getMonth()
  const isCurrentMonth = currentMonth === +month - 1

  const { prevMonth, prevYear, nextMonth, nextYear } = getNextAndPrevDate(
    +month - 1,
    +year,
  )

  const selectedMonth = +month - 1
  const titleDate = format(new Date(+year, selectedMonth, 1), 'LLLL yyyy', {
    locale: ru,
  })
  const titleCurrentMonth = format(new Date(+year, currentMonth, 1), 'LLLL', {
    locale: ru,
  })
  const titleNextMonth = format(
    new Date(+year, nextMonth.jsNumber, 1),
    'LLLL',
    {
      locale: ru,
    },
  )

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{titleDate}</Text>
        <TouchableOpacity
          onPress={() => {
            if (typeof changeMonth !== 'function') return

            if (isCurrentMonth) {
              changeMonth(type, `${nextMonth.calendarNumber}-${nextYear}`)
              return
            }

            changeMonth(type, `${prevMonth.calendarNumber}-${prevYear}`)
          }}
        >
          {currentMonth < selectedMonth && (
            <Text style={styles.changeMonthTitle}>← {titleCurrentMonth}</Text>
          )}
          {currentMonth === selectedMonth && (
            <Text style={styles.changeMonthTitle}>{titleNextMonth} →</Text>
          )}
        </TouchableOpacity>
      </View>
      <SectionList
        contentContainerStyle={{
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}
        style={{ width: '100%' }}
        data={releases}
        sections={preparedReleases}
        keyExtractor={(release: any) => release.id}
        renderItem={({ item, index, section }) => (
          <ReleaseCard
            {...item}
            type={type}
            isFirst={index === 0}
            isLast={index === section.data.length - 1}
            openRelease={() => {
              openRelease(item.release_id, item.title)
            }}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionTitle}>
            {format(parseISO(title), 'dd EEEEEE', { locale: ru })}
          </Text>
        )}
        ItemSeparatorComponent={() => <View style={{ margin: 8 }} />}
        SectionSeparatorComponent={() => <View style={{ margin: 16 }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  changeMonthTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.rubik500,
    color: theme.colors.primaryText,
  },
  title: {
    fontFamily: theme.fonts.rubik700,
    letterSpacing: 1,
    color: theme.colors.primaryText,
    fontSize: 28,
  },
  sectionTitle: {
    fontFamily: theme.fonts.rubik500,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -24,
    color: theme.colors.primaryText,
  },
})
