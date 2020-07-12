import React from 'react'
import { StatusBar } from 'react-native'
import { ReleaseList } from '../../components/ReleaseList'
import { CalendarStackNavProps } from '../../types/CalendarParamList'
import { ReleaseTypes } from '../../types/ReleaseTypes'

export const Releases: React.FC<CalendarStackNavProps<'Releases'>> = ({
  route,
  navigation,
}) => {
  return (
    <>
      <StatusBar barStyle="light-content" translucent />
      <ReleaseList
        type={route.params.type}
        date={route.params.date}
        openRelease={(id: string, title: string) => {
          navigation.navigate('Release', {
            id,
            title,
          })
        }}
        changeMonth={(type: keyof typeof ReleaseTypes, date: string) => {
          navigation.navigate('Releases', {
            type,
            date,
          })
        }}
      />
    </>
  )
}
