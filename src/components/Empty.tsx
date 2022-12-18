import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'


const Empty = ({tryAgain} : any) => {

  return (
    <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
      <Smile source={require('../../assets/main/smile.png')}/>
      <Text style={{fontSize: 20, marginTop: 50}}>Oops... something went wrong</Text>
      <TouchableOpacity onPress={tryAgain} style={{marginTop: 50, width: 300, height: 60, borderRadius: 10, backgroundColor: '#00003B', alignItems: 'center', justifyContent:'center',}}>
        <Text style={{color: 'white', textTransform: "uppercase", fontWeight: 'bold', fontSize: 16}}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

const Smile = styled.Image`
`

export default Empty;
