import React from 'react'
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { theme } from '../core/theme'
import { ReleaseTypes } from '../types/ReleaseTypes'

interface Props {
  release_id: string
  title: string
  cover: string
  openRelease: () => void
  isFirst: boolean
  isLast: boolean
  type: keyof typeof ReleaseTypes
  director: string
  season: string
  platforms: string[]
}

const Info = ({ type, director, season, platforms }: any): any => {
  if (type === 'movies') {
    return <Text style={styles.infoText}>{director}</Text>
  }

  if (type === 'serials') {
    return <Text style={styles.infoText}>{season} сезон</Text>
  }

  if (type === 'games') {
    return (
      <View style={styles.platforms}>
        {platforms.map((platform: any) => {
          switch (platform) {
            case 'pc':
              return (
                <View key={platform} style={styles.platform}>
                  <FontAwesome5 name="windows" size={18} color="#fff" />
                </View>
              )
            case 'ps_4':
              return (
                <View key={platform} style={styles.platform}>
                  <FontAwesome5 name="playstation" size={18} color="#fff" />
                </View>
              )
            case 'xbox_one':
              return (
                <View key={platform} style={styles.platform}>
                  <FontAwesome5 name="xbox" size={18} color="#fff" />
                </View>
              )
            case 'nintendo_switch':
              return (
                <View key={platform} style={styles.platform}>
                  <FontAwesome5 name="nintendo-switch" size={18} color="#fff" />
                </View>
              )
            default:
              return null
          }
        })}
      </View>
    )
  }
}

export const ReleaseCard: React.FC<Props> = ({
  title,
  openRelease,
  cover,
  isFirst,
  isLast,
  type,
  director,
  season,
  platforms,
}) => {
  function getBorderRadius() {
    if (isFirst && isLast) {
      return {
        borderRadius: 14,
      }
    }

    if (isFirst) {
      return {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
      }
    }

    if (isLast) {
      return {
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
      }
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        openRelease()
      }}
    >
      <ImageBackground
        source={{ uri: cover }}
        style={styles.cover}
        imageStyle={styles.image}
        {...getBorderRadius()}
      >
        <View>
          <Text style={styles.title}>{title}</Text>
          <Info
            type={type}
            director={director}
            season={season}
            platforms={platforms}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    borderRadius: 14,
    backgroundColor: 'rgb(11, 11, 11)',
  },
  cover: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    height: 200,
  },
  image: {
    opacity: 0.7,
    borderRadius: 14,
  },
  title: {
    color: theme.colors.primaryText,
    fontFamily: theme.fonts.rubik500,
    paddingLeft: 14,
    paddingBottom: 2,
    fontSize: 18,
  },
  infoText: {
    color: theme.colors.primaryText,
    paddingLeft: 14,
    paddingBottom: 14,
    fontFamily: theme.fonts.rubikItalic,
    fontSize: 14,
    fontStyle: 'italic',
  },
  platforms: {
    flexDirection: 'row',
    paddingLeft: 14,
    paddingBottom: 14,
  },
  platform: {
    marginRight: 8,
  },
})
