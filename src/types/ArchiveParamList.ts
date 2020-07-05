import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { ReleaseTypes } from './ReleaseTypes'

export type ArchiveParamList = {
  SelectDate: undefined
  SelectReleaseType: {
    date: string
  }
  Releases: {
    type: keyof typeof ReleaseTypes
  }
  Release: {
    id: string
  }
}

export type ArchiveStackNavProps<T extends keyof ArchiveParamList> = {
  navigation: StackNavigationProp<ArchiveParamList, T>
  route: RouteProp<ArchiveParamList, T>
}
