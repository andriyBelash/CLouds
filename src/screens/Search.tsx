import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {StatusBar} from "expo-status-bar";

const Search = () => {
  return (
    <View>
      <StatusBar style="light" backgroundColor="#00003B" />
      <View style={styles.top}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 60,
    marginTop: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default Search;
