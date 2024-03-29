import React from 'react'
import { useMutation, useQueryCache } from 'react-query'
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { compareAsc } from 'date-fns/esm'
import Title from '../../components/Title'
import Text from '../../components/Text'
import ReleaseList from '../../components/ReleaseList'
import Button from '../../components/Button'
import { useUser } from '../../features/user/use-user'
import { removeToken } from '../../features/user/utils'
import { releaseItemAdapter } from '../../shared/utils'
import { logout } from '../../shared/api'
import { endpoints } from '../../shared/constants'

import { MeStackNavProps } from '../../types/screens'
import { ReleaseType, ReleaseItem } from '../../types/releases'
import { ReleaseItemFromApi } from '../../types/api'

function prepareData(
  arr: ReleaseItemFromApi[],
): {
  actual: ReleaseItem[]
  nonActual: ReleaseItem[]
} {
  let result = {
    actual: [],
    nonActual: [],
  }

  arr.forEach(release => {
    if (compareAsc(new Date(), new Date(release.released)) <= 0) {
      ;(result.actual as ReleaseItem[]).push(releaseItemAdapter(release))
    } else {
      ;(result.nonActual as ReleaseItem[]).push(releaseItemAdapter(release))
    }
  })

  return result
}

const Me: React.FC<MeStackNavProps<'Me'>> = () => {
  const queryCache = useQueryCache()
  const [signOut] = useMutation(logout, {
    onSuccess: async () => {
      await removeToken()
      queryCache.invalidateQueries(endpoints.PROFILE)
    },
  })
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loaderWrapper}>
        <ActivityIndicator size="small" />
      </SafeAreaView>
    )
  }

  if (!user) return null

  const { expected } = user

  const films = prepareData(expected.movies)
  const games = prepareData(expected.games)
  const series = prepareData(expected.serials)

  const hasActual =
    [...films.actual, ...games.actual, ...series.actual].length > 0
  const hasNonActual =
    [...films.nonActual, ...games.nonActual, ...series.nonActual].length > 0

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.screen}>
        <Title h1 style={styles.title}>
          Личный кабинет
        </Title>
        {!hasActual && !hasNonActual && (
          <View>
            <Text style={styles.desc}>
              Сейчас у&nbsp;вас нет ожидаемых релизов. Чтобы их&nbsp;добавить,
              нажмите на&nbsp;кнопку с&nbsp;огнем или с&nbsp;закладкой
              в&nbsp;карточке релиза. В&nbsp;день релиза вы&nbsp;получите
              пуш-уведомление, поэтому не&nbsp;забудьте их&nbsp;включить. Если
              релиз еще не&nbsp;вышел, то&nbsp;он&nbsp;попадет
              в&nbsp;&laquo;Ожидаемые релизы&raquo;, а&nbsp;если уже вышел,
              то&nbsp;в&nbsp;&laquo;Уже вышло&raquo;.
            </Text>
          </View>
        )}
        <View style={styles.section}>
          <Title h2 style={styles.sectionTitle}>
            Ожидаемые релизы
          </Title>
          {hasActual ? (
            <>
              {films.actual.length > 0 && (
                <ReleaseList type={ReleaseType.Films} releases={films.actual} />
              )}
              {games.actual.length > 0 && (
                <ReleaseList type={ReleaseType.Games} releases={games.actual} />
              )}
              {series.actual.length > 0 && (
                <ReleaseList
                  type={ReleaseType.Series}
                  releases={series.actual}
                />
              )}
            </>
          ) : (
            <Text>Нет ожидаемых релизов</Text>
          )}
        </View>
        {hasNonActual && (
          <View style={styles.section}>
            <Title h2 style={styles.sectionTitle}>
              Уже вышли
            </Title>
            {films.nonActual.length > 0 && (
              <ReleaseList
                type={ReleaseType.Films}
                releases={films.nonActual}
              />
            )}
            {games.nonActual.length > 0 && (
              <ReleaseList
                type={ReleaseType.Games}
                releases={games.nonActual}
              />
            )}
            {series.nonActual.length > 0 && (
              <ReleaseList
                type={ReleaseType.Series}
                releases={series.nonActual}
              />
            )}
          </View>
        )}
        <Button
          extendedStyle={{
            button: () => ({
              marginBottom: 24,
            }),
          }}
          onPress={() => {
            signOut()
          }}
        >
          Выйти
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safe: {
    flex: 1,
  },
  screen: {
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 16,
  },
  desc: {
    lineHeight: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 4,
  },
})

export default Me
