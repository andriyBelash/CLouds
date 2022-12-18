import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'

const { width } = Dimensions.get('screen')

const Pagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.dotContainer}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange:[12, 30, 12],
          extrapolate: 'clamp'
        })
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange:[0.4, 1, 0.4],
          extrapolate: 'clamp'
        })
        return <Animated.View key={idx.toString()} style={[styles.dot, {width: dotWidth, opacity: opacity}, idx === index && styles.dotActive]}></Animated.View>
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: '55%',
    width: '100%',
    justifyContent: 'center'
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    marginLeft: 12,
  },
  dotActive: {
    backgroundColor: '#00003b'
  }
})

export default Pagination;
