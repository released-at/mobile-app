import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns/esm'
import { ru } from 'date-fns/esm/locale'
import { getDateInfo } from '../../features/releases/utils'

function Header({ month, year, toNext, toPrev, toCurrent }) {
  const { navigate } = useNavigation()
  const { isCurrentMonth, isNextMonth, nextMonth, prevMonth } = getDateInfo({
    month,
    year,
  })

  const isNotActual = !isCurrentMonth && !isNextMonth

  if (isNotActual) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {month.rus} {year}
        </Text>
        <View style={styles.buttons}>
          <Pressable onPress={toCurrent}>
            <Text style={styles.buttonText}>
              {format(new Date(), 'LLLL', { locale: ru })}&nbsp;→
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
      <Text style={styles.title}>{month.rus}</Text>
      <View style={styles.buttons}>
        <Pressable onPress={isCurrentMonth ? toNext : toPrev}>
          {isCurrentMonth ? (
            <Text style={styles.buttonText}>{nextMonth.rus}&nbsp;→</Text>
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
    fontWeight: '900',
    fontSize: 36,
    textTransform: 'capitalize',
    marginVertical: 16,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'normal',
  },
})

export default Header
