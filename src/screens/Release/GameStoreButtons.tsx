import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Linking from 'expo-linking'
import Button from '../../components/Button'

import { GameStore, GameStoreType } from '../../types/releases'

interface Props {
  stores: GameStore[]
}

const storeDict = {
  [GameStoreType.Steam]: {
    title: 'Steam',
    backgroundColor: '#1b2838',
    color: '#fff',
  },
  [GameStoreType.EGS]: {
    title: 'Epic Games Store',
    backgroundColor: '#121212',
    color: '#fff',
  },
  [GameStoreType.GOG]: {
    title: 'GOG',
    backgroundColor: '#a268Bd',
    color: '#fff',
  },
  [GameStoreType.PlayStationStore]: {
    title: 'PlayStation Store',
    backgroundColor: '#003087',
    color: '#fff',
  },
  [GameStoreType.XboxStore]: {
    title: 'Xbox Store',
    backgroundColor: '#52b043',
    color: '#000',
  },
  [GameStoreType.NintendoStore]: {
    title: 'Nintendo Store',
    backgroundColor: '#e60012',
    color: '#fff',
  },
}

function GameStoreButtons({ stores }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.buttons}>
        {stores.map(store => (
          <Button
            key={store.type}
            extendedStyle={{
              button: () => ({
                backgroundColor: storeDict[store.type].backgroundColor,
                margin: 4,
              }),
              text: {
                color: storeDict[store.type].color,
              },
            }}
            onPress={() => {
              Linking.openURL(store.link)
            }}
          >
            {storeDict[store.type].title} {store.price}
          </Button>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
})

export default GameStoreButtons
