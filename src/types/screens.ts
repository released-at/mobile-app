import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type TabScreens = {
  Calendar: undefined
  Archive: undefined
  Profile: undefined
  Blog: undefined
  Tinder: undefined
}

export type CalendarScreens = {
  Releases: undefined
  Release: {
    id: number
  }
  Today: undefined
}

export type CalendarStackNavProps<T extends keyof CalendarScreens> = {
  navigation: StackNavigationProp<CalendarScreens, T>
  route: RouteProp<CalendarScreens, T>
}

export type ArchiveScreens = {
  SelectMonth: undefined
  Releases: {
    month: string
    year: string
  }
  Release: undefined
}

export type ArchiveStackNavProps<T extends keyof ArchiveScreens> = {
  navigation: StackNavigationProp<ArchiveScreens, T>
  route: RouteProp<ArchiveScreens, T>
}

export type BlogScreens = {
  Posts: undefined
  Post: {
    id: number
  }
}

export type BlogStackNavProps<T extends keyof BlogScreens> = {
  navigation: StackNavigationProp<BlogScreens, T>
  route: RouteProp<BlogScreens, T>
}

export type TinderScreens = {
  Tinder: undefined
  Release: undefined
}

export type MeScreens = {
  SignIn: undefined
  SignUp: undefined
  Me: undefined
  Release: undefined
}

export type MeStackNavProps<T extends keyof MeScreens> = {
  navigation: StackNavigationProp<MeScreens, T>
  route: RouteProp<MeScreens, T>
}
