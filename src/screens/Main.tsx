import React from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import styled from 'styled-components/native'


const Main = () => {
  return (
    <MainBLock>
      <BlockImage source={require('../../assets/main/night.jpeg')} resizeMode='cover'>
      </BlockImage>
      <BlockContent>
      </BlockContent>
    </MainBLock>
  );
};

const MainBLock = styled.View`
  width: 100%;
  height: 100%
`
const BlockImage = styled.ImageBackground`
  width: 100%;
  height: 570px;
`
const BlockContent = styled.View`
  background-color: white;
  height: 300px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  position: absolute;
  width: 100%;
  bottom: 0;
`

export default Main;
