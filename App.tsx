import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import MainContainer from "./src/MainContainer";
import DriwerContainer from "./src/DriwerContainer";
import Main from "./src/screens/Main";



export default function App() {


  return (
    <MainContainer/>
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
