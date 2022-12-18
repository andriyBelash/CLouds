import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, Pressable} from 'react-native';
import {StatusBar} from "expo-status-bar";

const Search = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="light" backgroundColor="#00003B" />

      <View style={{flex: 1}}>
        <ImageBackground style={{flex: 1}} source={require('../../assets/search/s.jpeg')} resizeMode="cover">
          <Text style={{marginTop: 60, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#00003b', textTransform: 'uppercase'}}>Current Weather Data</Text>
          <View style={styles.topSearch}>
            <TextInput style={styles.input}/>
            <Pressable style={styles.searchBtn}>
              <Text style={{color: 'white'}}>Search</Text>
            </Pressable>
          </View>
        </ImageBackground>
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
  topSearch: {
    height: 40,
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'space-between'
  },
  input: {
    width: '75%',
    height: 40,
    borderRadius: 10,
    borderColor: '#00003B',
    borderWidth: 1,
    paddingLeft: 20

  },
  searchBtn: {
    width: 80,
    height: 40,
    backgroundColor: '#00003b',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Search;
