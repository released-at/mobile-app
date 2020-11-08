import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'
import ScreenWrapper from '../../components/ScreenWrapper'
import ReleaseCard from '../../components/ReleaseCard'
import * as api from '../../shared/api'
import { endpoints } from '../../shared/constants'

import { ReleaseItem } from '../../types/releases'

function Today() {
  const { data } = useQuery<ReleaseItem[]>(endpoints.TODAY, api.today)

  if (!data) return null

  return (
    <ScreenWrapper title="Сегодня">
      {data.length === 0 && (
        <Text style={styles.empty}>Сегодня ничего нового не вышло 😑</Text>
      )}
      {data.map(release => (
        <ReleaseCard
          style={styles.card}
          key={release.title}
          release={release}
          type={release.type}
        />
      ))}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  empty: {
    fontSize: 18,
    lineHeight: 28,
  },
  card: {
    marginBottom: 24,
  },
})

export default Today
