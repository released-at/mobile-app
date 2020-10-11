import React from 'react'
import {
  TouchableHighlight,
  Image,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import GamePlatformList from './GamePlatformList'
import ExpectButton from './ExpectButton'
import { ifElse } from '../shared/utils'

interface Props {
  style?: StyleProp<ViewStyle>
  type: any
  release: any
}

const ReleaseCard: React.FC<Props> = ({
  style = StyleSheet.create({}),
  type,
  release,
}) => {
  const { navigate } = useNavigation()

  return (
    <TouchableHighlight
      style={[styles.container, style]}
      onPress={() =>
        navigate('Release', {
          id: release.release_id,
        })
      }
    >
      <View style={styles.cardContent}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.75)']}
          style={styles.darkGradient}
        />
        <View style={styles.header}>
          <View style={styles.releaseDate}>
            <Text style={styles.date}>
              {format(new Date(release.released), 'd MMM, EEEEEE', {
                locale: ru,
              })}
            </Text>
          </View>
          <ExpectButton style={styles.expect} type={type} release={release} />
        </View>
        <Image
          style={styles.cover}
          source={{ uri: release.cover, cache: 'default' }}
        />
        <View style={styles.footer}>
          <Text style={styles.title}>{release.title}</Text>
          {ifElse(
            type === 'films',
            <Text style={styles.extra}>{release.director}</Text>,
          )}
          {ifElse(
            type === 'games',
            <GamePlatformList platforms={release.platforms} />,
          )}
          {ifElse(
            type === 'series',
            <Text style={styles.extra}>Сезон {release.season}</Text>,
          )}
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 315,
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
  },
  cover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  darkGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: 315,
    height: 220,
    zIndex: 1,
  },
  header: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    top: 16,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  expect: {},
  releaseDate: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  date: {
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    zIndex: 2,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  extra: {
    color: '#fff',
    fontSize: 16,
  },
})

export default ReleaseCard
