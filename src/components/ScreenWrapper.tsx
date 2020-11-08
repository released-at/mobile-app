import React, { PropsWithChildren } from 'react'
import {
  SafeAreaView,
  StatusBarProps,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import Constants from 'expo-constants'
import Title from './Title'
import FocusAwareStatusBar from './FocusAwareStatusBar'

interface Props {
  title?: string
  statusBarProps?: StatusBarProps
  inScrollView?: boolean
}

const ScreenWrapper: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
  statusBarProps = {
    barStyle: 'light-content',
    backgroundColor: '#0b0b0b',
    translucent: false,
  },
  inScrollView = true,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FocusAwareStatusBar {...statusBarProps} />
      {inScrollView ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.container}
        >
          {title && (
            <Title style={styles.title} h1>
              {title}
            </Title>
          )}
          <View style={title ? {} : styles.view}>{children}</View>
        </ScrollView>
      ) : (
        <>
          {title && (
            <Title style={styles.title} h1>
              {title}
            </Title>
          )}
          <View style={title ? {} : styles.view}>{children}</View>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    marginTop: Constants.statusBarHeight,
  },
  view: {
    marginTop: Constants.statusBarHeight,
  },
  container: {
    paddingHorizontal: 16,
  },
})

export default ScreenWrapper
