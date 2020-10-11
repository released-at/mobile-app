import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import ReleaseCard from './ReleaseCard'

const typeDict = {
  films: 'Кино',
  games: 'Игры',
  series: 'Сериалы',
}

const ReleaseList: React.FC = ({ releases, type }) => {
  return (
    <View style={styles.list}>
      <Text style={styles.title}>{typeDict[type]}</Text>
      <FlatList
        data={releases}
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
    marginBottom: 20,
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
