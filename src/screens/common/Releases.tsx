import React from 'react'
import { ReleaseList } from '../../components/ReleaseList'
import { CalendarStackNavProps } from '../../types/CalendarParamList'

export const Releases: React.FC<CalendarStackNavProps<'Releases'>> = ({
  route,
  navigation,
}) => {
  return (
    <ReleaseList
      type={route.params.type}
      date={route.params.date}
      openRelease={(id: string) => {
        navigation.navigate('Release', {
          id,
        })
      }}
    />
  )
}
