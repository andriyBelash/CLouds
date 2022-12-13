import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Block } from "./Block";

export default function App() {
  return (
    <View style={styles.container}>
      <Block />
      <View style={styles.spacer} />
      <Block />
      <View style={styles.spacer} />
      <Block />
      <View style={styles.spacer} />
      <Block />
      <View style={styles.spacer} />
      <Block />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  spacer: {
    width: 10,
  }
});
