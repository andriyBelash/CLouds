import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Main from "./src/screens/Main";



export default function App() {


  return (
    <View style={styles.container}>
      <Main/>
      <StatusBar style="light" backgroundColor="#6a51ae" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
