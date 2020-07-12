import React, { PropsWithChildren } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Linking } from 'react-native'
import { EpicGamesStoreIcon } from './icons/EpicGamesStore'
import { GOGIcon } from './icons/GOG'
import { ItchIcon } from './icons/Itch'
import { NintendoStoreIcon } from './icons/NintendoStore'
import { PlaystationStoreIcon } from './icons/PlaystationStore'
import { SteamIcon } from './icons/Steam'
import { XboxStoreIcon } from './icons/XboxStore'
import { theme } from '../core/theme'
import { Store as StoreType, RawgStore } from '../types/Release'

const Store: React.FC<PropsWithChildren<{
  title: string
  store: StoreType
}>> = ({ children, title, store }) => {
  return (
    <View style={styles.buttonContent}>
      {children}
      <Text style={styles.storeTitle}>
        {title}{' '}
        {store.price && store.price !== '$0.00' ? (
          <Text style={styles.storePrice}>[{store.price}]</Text>
        ) : null}
      </Text>
    </View>
  )
}

const getStoreLinkContent = (store: StoreType) => {
  switch (store.type) {
    case 'playstation-store':
      return (
        <Store title="PlayStation Store" store={store}>
          <PlaystationStoreIcon />
        </Store>
      )
    case 'gog':
      return (
        <Store title="GOG" store={store}>
          <GOGIcon />
        </Store>
      )
    case 'epic-games':
      return (
        <Store title="Epic Games Store" store={store}>
          <EpicGamesStoreIcon />
        </Store>
      )
    case 'steam':
      return (
        <Store title="Steam" store={store}>
          <SteamIcon />
        </Store>
      )
    case 'xbox-store':
      return (
        <Store title="Xbox Store" store={store}>
          <XboxStoreIcon />
        </Store>
      )
    case 'nintendo':
      return (
        <Store title="Nintendo Store" store={store}>
          <NintendoStoreIcon />
        </Store>
      )
    case 'itch':
      return (
        <Store title="itch.io" store={store}>
          <ItchIcon />
        </Store>
      )
  }
}

const renderStores = (stores: StoreType[]) =>
  stores.map(store => (
    <TouchableOpacity
      style={styles.button}
      key={store.type}
      onPress={() => {
        Linking.openURL(store.link)
      }}
    >
      {getStoreLinkContent(store)}
    </TouchableOpacity>
  ))

function prepareStores(stores: StoreType[], rawgStores?: RawgStore[]) {
  if (stores.length) return stores

  if (rawgStores && rawgStores.length)
    return rawgStores.map(store => ({
      link: store.url,
      type: store.store.slug,
    }))

  return []
}

export const StoreButtons: React.FC<{
  stores: StoreType[]
  rawgStores?: RawgStore[]
}> = ({ stores, rawgStores }) => {
  const preparedStores = prepareStores(stores, rawgStores)

  if (!preparedStores.length) return null

  return <View style={styles.container}>{renderStores(preparedStores)}</View>
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: -4,
    marginBottom: 16,
  },
  button: {
    alignSelf: 'flex-start',
    margin: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 4,
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: '#dbdbdb',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeTitle: {
    fontFamily: theme.fonts.rubik400,
    fontSize: 16,
    marginLeft: 8,
  },
  storePrice: {
    fontFamily: theme.fonts.rubik500,
  },
})
