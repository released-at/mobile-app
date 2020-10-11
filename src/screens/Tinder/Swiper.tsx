import React, { useRef, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import SwiperDeck from 'react-native-deck-swiper'
import shuffle from 'lodash.shuffle'
import Card from './Card'
import IconButton from './IconButton'
import OverlayLabel from './OverlayLabel'

function Swiper({ films }) {
  const shuffled = useMemo(() => {
    return shuffle(films)
  }, [films])
  const swiperRef = useRef<SwiperDeck<unknown>>(null)

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        <SwiperDeck
          ref={swiperRef}
          animateCardOpacity
          containerStyle={styles.container}
          cards={shuffled}
          renderCard={card => <Card card={card} />}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={2}
          infinite
          showSecondCard
          animateOverlayLabelsOpacity
          cardVerticalMargin={0}
          overlayLabels={{
            left: {
              title: 'NOPE',
              element: <OverlayLabel label="NOPE" color="#e5566d" />,
              style: {
                wrapper: styles.overlayWrapper,
              },
            },
            right: {
              title: 'LIKE',
              element: <OverlayLabel label="LIKE" color="#4ccc93" />,
              style: {
                wrapper: {
                  ...styles.overlayWrapper,
                  alignItems: 'flex-start',
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton
          name="close"
          onPress={() => swiperRef.current?.swipeLeft()}
          color="white"
          backgroundColor="#e5566d"
        />
        <IconButton
          name="star"
          onPress={() => swiperRef.current?.swipeTop()}
          color="white"
          backgroundColor="#3ca3ff"
        />
        <IconButton
          name="heart"
          onPress={() => swiperRef.current?.swipeRight()}
          color="white"
          backgroundColor="#4ccc93"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  swiperContainer: {
    flex: 1,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '15%',
    marginBottom: 16,
  },
  overlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: -30,
  },
})

export default Swiper
