import React from 'react'
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native'

interface Props {
  release_id: string
  title: string
  cover: string
  openRelease: () => void
  isFirst: boolean
  isLast: boolean
}

export const ReleaseCard: React.FC<Props> = ({
  title,
  openRelease,
  cover,
  isFirst,
  isLast,
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
      onPress={() => {
        openRelease()
      }}
    >
      <ImageBackground
        source={{ uri: cover }}
        style={styles.cover}
        {...getBorderRadius()}
      >
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
  },
  cover: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    height: 200,
  },
  title: {
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    paddingLeft: 14,
    paddingBottom: 14,
    fontSize: 18,
    fontWeight: 'bold',
  },
})
