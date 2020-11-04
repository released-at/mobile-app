import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { compareAsc } from 'date-fns/esm'
import ReleaseCard from './ReleaseCard'
import Title from '../components/Title'
import { ReleaseType, ReleaseItem } from '../types/releases'

const typeDict = {
  [ReleaseType.Films]: 'Кино',
  [ReleaseType.Games]: 'Игры',
  [ReleaseType.Series]: 'Сериалы',
}

interface Props {
  releases: ReleaseItem[]
  type: ReleaseType
}

const ReleaseList: React.FC<Props> = ({ releases, type }) => {
  return (
    <View style={styles.list}>
      <Title h2>{typeDict[type]}</Title>
      <FlatList
        data={releases.sort((a, b) =>
          compareAsc(new Date(a.released), new Date(b.released)),
        )}
        renderItem={({ item }) => (
          <ReleaseCard style={styles.card} type={type} release={item} />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },
  card: {
    marginRight: 16,
  },
})

export default ReleaseList
