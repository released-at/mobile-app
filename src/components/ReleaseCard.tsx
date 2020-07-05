import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface Props {
  release_id: string
  title: string
  openRelease: () => void
}

export const ReleaseCard: React.FC<Props> = ({
  release_id,
  title,
  openRelease,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        openRelease()
      }}
    >
      <Text>{`${title} ${release_id}`}</Text>
    </TouchableOpacity>
  )
}
