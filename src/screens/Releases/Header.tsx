import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import { AntDesign } from '@expo/vector-icons'
import Title from '../../components/Title'
import Text from '../../components/Text'
import { getDateInfo } from '../../features/releases/utils'
import { getFont } from '../../shared/utils'

import { Month } from '../../types/common'

interface Props {
  month: Month
  year: number
  toNext: () => void
  toPrev: () => void
  toCurrent: () => void
}

function Header({ month, year, toNext, toPrev, toCurrent }: Props) {
  const { navigate } = useNavigation()
  const { isCurrentMonth, isNextMonth, nextMonth, prevMonth } = getDateInfo({
    month,
    year,
  })

  const isNotActual = !isCurrentMonth && !isNextMonth

  if (isNotActual) {
    return (
      <View style={styles.container}>
        <Title h1 style={styles.title}>
          {month.rus} {year}
        </Title>
        <View style={styles.buttons}>
          <Pressable onPress={toCurrent}>
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>
                {format(new Date(), 'LLLL', { locale: ru })}
              </Text>
              <AntDesign name="arrowright" size={24} color="#f5f5f5" />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate('Today')
            }}
          >
            <Text style={styles.buttonText}>сегодня</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Title h1 style={styles.title}>
        {month.rus}
      </Title>
      <View style={styles.buttons}>
        <Pressable onPress={isCurrentMonth ? toNext : toPrev}>
          {isCurrentMonth ? (
            <View style={styles.buttonView}>
              <Text style={styles.buttonText}>{nextMonth.rus}</Text>
              <AntDesign name="arrowright" size={24} color="#f5f5f5" />
            </View>
          ) : (
            <View style={styles.buttonView}>
              <AntDesign name="arrowleft" size={24} color="#f5f5f5" />
              <Text style={styles.buttonText}>{prevMonth.rus}</Text>
            </View>
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            navigate('Today')
          }}
        >
          <Text style={styles.buttonText}>сегодня</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    marginTop: Constants.statusBarHeight,
    textTransform: 'capitalize',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontFamily: getFont('primary', 600),
  },
})

export default Header
