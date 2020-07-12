import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { ReleaseTypes } from './ReleaseTypes'

export type ArchiveParamList = {
  SelectDate: undefined
  SelectReleaseType: {
    date: string
    formattedDate: string
  }
  Releases: {
    type: keyof typeof ReleaseTypes
    date: string
  }
  Release: {
    id: string
    title: string
  }
}

export type ArchiveStackNavProps<T extends keyof ArchiveParamList> = {
  navigation: StackNavigationProp<ArchiveParamList, T>
  route: RouteProp<ArchiveParamList, T>
}
