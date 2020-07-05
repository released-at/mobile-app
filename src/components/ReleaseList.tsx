import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { ReleaseCard } from './ReleaseCard'
import { api } from '../core/api'
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

  return (
    <FlatList
      style={{ width: '100%' }}
      renderItem={({ item }) => {
        return (
          <ReleaseCard
            {...item}
            openRelease={() => {
              openRelease(item.release_id)
            }}
          />
        )
      }}
      keyExtractor={(release: any) => release.id.toString()}
      data={releases}
    />
  )
}
