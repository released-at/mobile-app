import React from 'react'
import { ScrollView, StatusBar, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { ReleaseList } from '../../components/ReleaseList'
import { CalendarStackNavProps } from '../../types/CalendarParamList'
import { ReleaseTypes, ReleaseTypesTuple } from '../../types/Releases'
import Card from '../../components/Card'
import { theme } from '../../core/theme'

const SubTitle = styled.Text`
  margin-left: 20px;
  color: #b8bece;
  font-family: ${theme.fonts.rubik700};
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
`

const types: ReleaseTypesTuple = [
  ReleaseTypes.Films,
  ReleaseTypes.Games,
  ReleaseTypes.Series,
]

export const Releases: React.FC<CalendarStackNavProps<'Releases'>> = ({
  route,
  navigation,
}) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" translucent />
      <ScrollView>
        {types.map(releaseType => (
          <ReleaseList
            type={releaseType}
            date={route.params.date}
            openRelease={(id: string, title: string) => {
              navigation.navigate('Release', {
                id,
                title,
              })
            }}
            changeMonth={(type, date: string) => {
              navigation.navigate('Releases', {
                type,
                date,
              })
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
