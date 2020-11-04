import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'

import { FilmItem } from '../../types/releases'

const { height } = Dimensions.get('window')

interface Props {
  card: FilmItem
}

const Card = ({ card }: Props) => (
  <View style={styles.card}>
    <Image
      style={styles.image}
      source={{ uri: card.cover }}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>{card.title}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  card: {
    height: height - 310,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: '100%',
  },
  photoDescriptionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    textShadowColor: '#000',
    textShadowRadius: 10,
  },
})

export default Card
