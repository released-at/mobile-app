import React from 'react'
import { View, Pressable, StyleSheet, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import Svg, { Path } from 'react-native-svg'
import Title from '../../components/Title'
import Text from '../../components/Text'
import { getDateInfo } from '../../features/releases/utils'
import { getFont } from '../../shared/utils'

import { Month } from '../../types/common'

function Arrow() {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={24}
      height={24}
    >
      <Path d="M5 12h14M12 5l7 7-7 7" />
    </Svg>
  )
}

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
            <Text style={styles.buttonText}>
              {format(new Date(), 'LLLL', { locale: ru })} <Arrow />
            </Text>
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
              <Arrow />
            </View>
          ) : (
            <Text style={styles.buttonText}>←&nbsp;{prevMonth.rus}</Text>
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
    textTransform: 'capitalize',
    ...Platform.select({
      ios: {
        marginTop: 16,
      },
      android: {
        marginTop: 40,
      },
    }),
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
