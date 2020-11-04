import React from 'react'
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native'
import { useQuery } from 'react-query'
import ReleaseCard from '../../components/ReleaseCard'
import * as api from '../../shared/api'
import { endpoints } from '../../shared/constants'

import { ReleaseItem } from '../../types/releases'

function Today() {
  const { data } = useQuery<ReleaseItem[]>(endpoints.TODAY, api.today)

  if (!data) return null

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
      >
        <Text style={styles.title}>Сегодня</Text>
        {data.length === 0 && (
          <Text style={styles.empty}>Сегодня ничего нового не вышло 😑</Text>
        )}
        {data.map(release => (
          <ReleaseCard key={release.id} release={release} type={release.type} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    height: '100%',
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '900',
    fontSize: 36,
    marginVertical: 16,
  },
  empty: {
    fontSize: 18,
    lineHeight: 28,
  },
})

export default Today
