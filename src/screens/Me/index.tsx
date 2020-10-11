import React from 'react'
import { useMutation, useQueryCache } from 'react-query'
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { compareAsc } from 'date-fns/esm'
import { ReleaseList } from '../../components'
import { useUser } from '../../features/user/use-user'
import { removeToken } from '../../features/user/utils'
import { logout } from '../../shared/api'
import { endpoints } from '../../shared/constants'

function actual(arr) {
  return arr.filter(i => compareAsc(new Date(), new Date(i.released)) <= 0)
}

function nonActual(arr) {
  return arr.filter(i => compareAsc(new Date(), new Date(i.released)) > 0)
}

function prepareData(arr) {
  let result = {
    actual: [],
    nonActual: [],
  }

  arr.forEach(i => {
    if (compareAsc(new Date(), new Date(i.released)) <= 0) {
      result.actual.push(i)
    } else {
      result.nonActual.push(i)
    }
  })

  return result
}

const Me: React.FC = () => {
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

  const { expected } = user

  const films = prepareData(expected.movies)
  const games = prepareData(expected.games)
  const series = prepareData(expected.serials)

  const hasActual = [...films.actual, games.actual, series.actual].length > 0
  const hasNonActual =
    [...films.nonActual, ...games.nonActual, ...series.nonActual].length > 0

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.screen}>
        <Text style={styles.title}>Личный кабинет</Text>
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
        {hasActual && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ожидаемые релизы</Text>
            {films.actual.length > 0 && (
              <ReleaseList type="films" releases={films.actual} />
            )}
            {games.actual.length > 0 && (
              <ReleaseList type="games" releases={games.actual} />
            )}
            {series.actual.length > 0 && (
              <ReleaseList type="series" releases={series.actual} />
            )}
          </View>
        )}
        {hasNonActual && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Уже вышли</Text>
            {films.nonActual.length > 0 && (
              <ReleaseList type="films" releases={films.nonActual} />
            )}
            {games.nonActual.length > 0 && (
              <ReleaseList type="games" releases={games.nonActual} />
            )}
            {series.nonActual.length > 0 && (
              <ReleaseList type="series" releases={series.nonActual} />
            )}
          </View>
        )}
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
    fontWeight: '900',
    fontSize: 36,
    marginVertical: 16,
  },
  desc: {
    lineHeight: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 4,
  },
})

export default Me
