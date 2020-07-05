import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { ReleaseTypes } from './ReleaseTypes'

export type CalendarParamList = {
  SelectReleaseType: {
    date?: string
  }
  Releases: {
    type: keyof typeof ReleaseTypes
    date: string
  }
  Release: {
    id: string
  }
}

export type CalendarStackNavProps<T extends keyof CalendarParamList> = {
  navigation: StackNavigationProp<CalendarParamList, T>
  route: RouteProp<CalendarParamList, T>
}
