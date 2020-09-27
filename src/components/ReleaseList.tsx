import React from 'react'
import { View, FlatList } from 'react-native'
import ReleaseCard from './ReleaseCard'

const ReleaseList: React.FC = ({ releases, type }) => {
  return (
    <View>
      <FlatList
        data={releases}
        renderItem={({ item }) => <ReleaseCard type={type} release={item} />}
        keyExtractor={item => item.id}
        horizontal
      />
    </View>
  )
}

export default ReleaseList
