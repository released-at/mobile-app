import React, { useMemo } from 'react'
import { Pressable, View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { useQueryCache, useMutation } from 'react-query'
import Svg, { Path } from 'react-native-svg'
import { useUser } from '../features/user/use-user'
import * as api from '../shared/api'
import { endpoints } from '../shared/constants'

import { ReleaseItem, Release, ReleaseType } from '../types/releases'
import { ReleaseTypeInApi, ReleaseItemFromApi } from '../types/api'
import { User } from '../types/user'

function FireOff() {
  return (
    <Svg viewBox="0 0 25 25">
      <Path
        d="M12.48 25a10.09 10.09 0 01-1.9-.18A9.46 9.46 0 013 15.7c0-3.32 1.65-5.31 3.12-7.07s2.62-3.15 2-5.45a.5.5 0 01.76-.54 10.3 10.3 0 013.73 4.56s0 .06.11.07a.16.16 0 00.15-.12 9 9 0 00-.81-6.39.5.5 0 01.06-.54.5.5 0 01.52-.16 12.07 12.07 0 014.71 3C19.46 5.1 22 9 22 15.67a9.25 9.25 0 01-3.39 7.15A9.58 9.58 0 0112.48 25zm-.31-8.75c-.78.56-2.17 2-2.17 5.22a2.5 2.5 0 005 0 3.51 3.51 0 00-1.09-2.2 8.27 8.27 0 01-1.74-3.02zm-2.85-12c.05 2.07-1.15 3.52-2.42 5C5.47 11 4 12.74 4 15.7a8.47 8.47 0 005.68 7.85A3.48 3.48 0 019 21.47c0-5.08 3.18-6.4 3.31-6.46a.51.51 0 01.43 0 .5.5 0 01.25.35 6.8 6.8 0 001.69 3.26A4.36 4.36 0 0116 21.47a3.47 3.47 0 01-.67 2.05A8.46 8.46 0 0018 22.05a8.26 8.26 0 003-6.38c0-9.57-5.22-13.12-7.55-14.23a9.73 9.73 0 01.4 6 1.16 1.16 0 01-1.08.86 1.08 1.08 0 01-1.1-.73 8.59 8.59 0 00-2.35-3.34z"
        fill="#0e1d25"
      />
    </Svg>
  )
}

function FireOn() {
  return (
    <Svg viewBox="0 0 25 25">
      <Path
        d="M17.35 3a12.08 12.08 0 00-4.72-3 .5.5 0 00-.52.16.5.5 0 00-.06.54 9 9 0 01.83 6.4.16.16 0 01-.15.12c-.09 0-.11 0-.11-.07a10.31 10.31 0 00-3.7-4.57.5.5 0 00-.76.54c.59 2.31-.57 3.7-2 5.46S3 12.4 3 15.72a9.47 9.47 0 007.38 9.08A3.26 3.26 0 019 22.17c0-5.34 3.5-6.67 3.5-6.67.7 3.5 3.5 4.3 3.5 6.67a3.26 3.26 0 01-1.35 2.61 9.5 9.5 0 004-1.93A9.26 9.26 0 0022 15.69C22 9 19.47 5.1 17.35 3z"
        fill="#0e1d25"
      />
    </Svg>
  )
}

const typeDict = {
  [ReleaseType.Films]: ReleaseTypeInApi.Films,
  [ReleaseType.Games]: ReleaseTypeInApi.Games,
  [ReleaseType.Series]: ReleaseTypeInApi.Series,
}

interface Props {
  style?: StyleProp<ViewStyle>
  release: ReleaseItem | Release
}

function ExpectButton({ style, release }: Props) {
  const { PROFILE } = endpoints
  const type = typeDict[release.type]

  const cache = useQueryCache()

  const { user } = useUser()

  const [expect] = useMutation(api.expect, {
    onMutate: ({ id }) => {
      cache.cancelQueries(PROFILE)

      const prevValue = cache.getQueryData(PROFILE)

      cache.setQueryData(PROFILE, savedUser => {
        const user = savedUser as User

        const releases: ReleaseItemFromApi[] = user.expected[type]
        const releaseIdsSet = new Set(
          releases.map(release => release.release_id),
        )

        const response = {
          current_user: user.current_user,
          expected: {
            ...user.expected,
            [type]: releaseIdsSet.has(id)
              ? releases.filter(release => release.release_id !== id)
              : [...releases, release],
          },
        }

        return response
      })

      return prevValue
    },
    onError: (err, variables, previousValue) =>
      cache.setQueryData(PROFILE, previousValue),
    onSettled: () => {
      cache.invalidateQueries(PROFILE)
    },
  })

  async function onPress() {
    if (!user) return

    await expect({ id: release.release_id })
  }

  const releaseIdsSet = useMemo(() => {
    if (!user) return new Set()

    const releases: ReleaseItemFromApi[] = user.expected[type]

    return new Set(releases.map(release => release.release_id))
  }, [user, type])

  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <View>
        {releaseIdsSet.has(release.release_id) ? <FireOn /> : <FireOff />}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 54,
    height: 36,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
})

export default ExpectButton
