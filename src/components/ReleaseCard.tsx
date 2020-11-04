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
import Title from './Title'
import GamePlatformList from './GamePlatformList'
import ExpectButton from './ExpectButton'
import { getFont } from '../shared/utils'

import { ReleaseType, ReleaseItem } from '../types/releases'

interface Props {
  style?: StyleProp<ViewStyle>
  type: ReleaseType
  release: ReleaseItem
}

const ReleaseCard: React.FC<Props> = ({
  style = StyleSheet.create({}),
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
              {format(new Date(release.released), 'EEEEEE, d MMM', {
                locale: ru,
              })}
            </Text>
          </View>
          <ExpectButton style={styles.expect} release={release} />
        </View>
        <Image
          style={styles.cover}
          source={{ uri: release.cover, cache: 'default' }}
        />
        <View style={styles.footer}>
          <Title h3 style={styles.title}>
            {release.title}
          </Title>
          {release.type === ReleaseType.Films && (
            <Text style={styles.extra}>{release.director}</Text>
          )}
          {release.type === ReleaseType.Games && (
            <GamePlatformList platforms={release.platforms} />
          )}
          {release.type === ReleaseType.Series && (
            <Text style={styles.extra}>Сезон {release.season}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
  date: {
    fontFamily: getFont('primary', 600),
    color: '#fff',
  },
  footer: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    zIndex: 2,
  },
  title: {
    color: '#fff',
    marginBottom: 2,
  },
  extra: {
    color: '#fff',
    fontSize: 16,
    fontFamily: getFont('secondary', 400, true),
  },
})

export default ReleaseCard
