import React, { useState, useEffect } from 'react'
import {
  SectionList,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'
import { compareAsc, format, parseISO } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { ReleaseCard } from './ReleaseCard'
import { api } from '../core/api'
import { groupBy } from '../core/helpers'
import { ReleaseTypes } from '../types/ReleaseTypes'

interface Props {
  type: keyof typeof ReleaseTypes
  date: string
  openRelease: (id: string) => void
}

export const ReleaseList: React.FC<Props> = ({ type, openRelease, date }) => {
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

  return (
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
          isFirst={index === 0}
          isLast={index === section.data.length - 1}
          openRelease={() => {
            openRelease(item.release_id)
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
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -24,
  },
})
