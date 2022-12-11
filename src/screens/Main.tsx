import React from 'react';
import {View, StyleSheet, Text, ImageBackground, TextInput, Pressable, Animated, Alert} from 'react-native';
import styled from 'styled-components/native'
import Icon from "react-native-vector-icons/Ionicons";
import * as Location from 'expo-location';
import axios from 'axios';
import {Coord} from "../types/type";
import {Weather} from "../types/type";



const Main = () => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const [location, setLocation] = React.useState<Coord>();
  const [errorMsg, setErrorMsg] = React.useState('');
  const [objCity, setObjCity] = React.useState({})
  const [items, setItems] = React.useState<Weather[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [city, setCity] = React.useState<string>('')



  function getCoord() {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }

  let API_KEY = 'c154ff1f8b740d23f2ed0b5cd246b68e'
  let url: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.coords.latitude.toFixed(2)}&lon=${location?.coords.longitude.toFixed(2)}&appid=${API_KEY}`


  function getWeather() {
  setLoading(true)
    setTimeout(() => {
      axios.get(url)
        .then(({data}) => {
          let day = new Date(Date.now())
          const yyyy = day.getFullYear();
          let mm: string | number = day.getMonth() + 1; // Months start at 0!
          let dd: string | number = day.getDate();
          if (dd < 10) dd = '0' + dd;
          if (mm < 10) mm = '0' + mm;
          const formattedToday = yyyy + '-' + mm + '-' + dd;

          let res = data.list.filter((el: any)=>el.dt_txt.includes(formattedToday))
          setItems(res)
          setObjCity(data.city)
          console.log(objCity)
          console.log(items)
        })
        .catch(e => {
          console.log(e)
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }, 500)

  }

  React.useEffect(() => {
    getCoord()
    getWeather()
  }, []);

    // Will change fadeAnim value to 0 in 3 seconds



  const visibleInput = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  return (
    <MainBLock>
      <BlockImage source={require('../../assets/main/day.jpeg')} resizeMode='cover'>
        <Top>
          <TopText style={ !visible ? {width: '80%'} : {width: '0%'}}>
            <Text style={{color: '#00003B', fontSize: 30 }}>Tokio</Text>
            <Text style={{color: '#00003B'}}>May, 2018</Text>
          </TopText>
          <TopInput >
              <TextInput style={ visible ? {opacity: 1, paddingLeft: 15, height: 35, width: '90%', borderRadius: 4, borderWidth: 1} : {width: '0%', opacity: 0}}/>
            <Pressable onPress={visibleInput}>
              <Icon name='ios-search' size={25} color='00003B'/>
            </Pressable>
          </TopInput>
        </Top>
        <ImageContent>
          <Left>
            <Text>{location?.coords.latitude}</Text>
            <Text>{location?.coords.longitude}</Text>
            <Text>gashdj</Text>
            <Text style={{marginTop: 5, fontSize: 15, fontWeight: '500', color: '#00003B', width: 80}}>Sunny and warm</Text>
          </Left>
          <Text style={{fontSize: 100, fontWeight: '500', color: '#00003B'}}>
            35
          </Text>
        </ImageContent>
      </BlockImage>
      <BlockContent>
        <View style={{borderBottomWidth: 1, borderBottomColor: '#00003B', paddingBottom: 10}}>
          <Text style={{fontSize: 25, color: '#00003B'}}>Weather Info</Text>
        </View>
        <GridBLock>

        </GridBLock>
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
  padding: 20px;
`
const Top = styled.View`
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  justify-content: space-between;
`

const TopText = styled.View`
  
`

const TopInput = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: 20px;
  align-items: center;
`

const Input = styled.TextInput`
  height: 35px;
  border-radius: 5px;
  border: 1px solid #00003B;
`

const Search = styled.Pressable`

`
const ImageContent = styled.View`
  margin-top: 60px;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Left = styled.View`
  
`

const GridBLock = styled.View`
`


export default Main;
