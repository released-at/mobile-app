import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { api } from '../../core/api'
import { CalendarStackNavProps } from '../../types/CalendarParamList'

export const Release: React.FC<CalendarStackNavProps<'Release'>> = ({
  route: {
    params: { id },
  },
}) => {
  const [release, setRelease] = useState<any>(null)

  useEffect(() => {
    async function fetchRelease() {
      const release = await api.release({ id })
      setRelease(release)
    }

    fetchRelease()
  }, [id])

  return release ? (
    <View>
      <Text>{release.title}</Text>
    </View>
  ) : (
    <ActivityIndicator size="large" />
  )
}
