import React from 'react';
import {View, StyleSheet, Text, ImageBackground, TextInput, Pressable, Animated, Dimensions ,Alert, Image} from 'react-native';
import styled from 'styled-components/native'
import Icon from "react-native-vector-icons/Ionicons";
import * as Location from 'expo-location';
import axios from 'axios';
import {Coord} from "../types/type";
import {Weather} from "../types/type";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import AppLoading from '../components/AppLoading';
import Empty from "../components/Empty";
import moment from "moment";
import {StatusBar} from "expo-status-bar";



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

  let WeatherIcon: any = {
    '01d': require("../../assets/day/sun.png"),
    '01n': require("../../assets/night/moon.png"),
    '02d': require("../../assets/day/f-c.png"),
    '02n': require("../../assets/night/f-c.png"),
    '03d': require("../../assets/all/clouds.png"),
    '03n': require("../../assets/night/clouds.png"),
    '04d': require("../../assets/all/b-c.png"),
    '04n': require("../../assets/night/b-c.png"),
    '09d': require("../../assets/all/rain.png"),
    '09n': require("../../assets/night/rain.png"),
    '10d': require("../../assets/day/s-r.png"),
    '10n': require("../../assets/night/s-r.png"),
    '11d': require("../../assets/all/th.png"),
    '11n': require("../../assets/night/th.png"),
    '13d': require("../../assets/all/sn.png"),
    '13n': require("../../assets/night/sn.png"),
    '50d': require("../../assets/all/wd.png"),
    '50n': require("../../assets/night/wd.png"),
  }

  let API_KEY = 'c154ff1f8b740d23f2ed0b5cd246b68e'
  let url: string = `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.coords.latitude.toFixed(2)}&lon=${location?.coords.longitude.toFixed(2)}&appid=${API_KEY}&units=metric`

  function getWeather() {
  setLoading(true)
    setTimeout(() => {
      axios.get(url)
        .then(({data}) => {

          let res = data.list.slice(0, 5)
          setItems(res)
          setObjCity(data.city)
        })
        .catch(e => {
          console.log(e)
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    }, 100)
  }

  React.useEffect(() => {
    getCoord()
    getWeather()
  }, []);

    // Will change fadeAnim value to 0 in 3 seconds

  if(loading) {
    return <AppLoading/>
  }

  if(!items[0]) {
    return(
      <Empty tryAgain={getWeather}/>
    )
  }

  return (
    <View ><StatusBar style="light" backgroundColor="#00003B" />
      <SwiperFlatList
        data={items}
        showPagination
        paginationStyle={styles.pagination}
        paginationStyleItemInactive={{width: 8,height: 8, borderRadius: 3, backgroundColor: '#ffffff'}}
        paginationStyleItemActive={{width: 25,height: 8, borderRadius: 3, backgroundColor: '#00003B'}}
        renderItem={({item}) => {
          let mainImg = item.weather[0].icon.includes('d') ? require('../../assets/main/day.jpeg') : require('../../assets/main/night.jpeg')
          let colorMode = item.weather[0].icon.includes('d') ? '#00003B' : '#ffffff'

          let formatDay = item.dt_txt.slice(0,-9)

          let dateMoment = moment(formatDay).format('MMMM Do YYYY')

          let dayMoment = moment(formatDay).format('dddd')

          return (
            <MainBLock style={{width}}>
              <TopBlock>
                <BlockImage source={mainImg} resizeMode='cover'>
                  <Top>
                    <TopText>
                      <Text style={{color: colorMode, fontSize: 30 }}>{objCity.name}</Text>
                      <Text style={{color: colorMode}}>{dateMoment}</Text>
                    </TopText>
                    <View style={{alignItems: 'flex-end'}}>
                      <Text style={{color: colorMode, fontSize: 15}}>{dayMoment}</Text>
                      <Text style={{color: colorMode, fontSize: 15}}>{item.dt_txt.slice(11, -3)}</Text>
                    </View>
                  </Top>
                  <ImageContent>
                    <Left>
                      <IconImage style={[{resizeMode: 'contain'}]} source={WeatherIcon[item.weather[0].icon]}/>
                      <Text style={{marginTop: 5, fontSize: 15, fontWeight: '500', color: colorMode, width: 80}}>{item.weather[0].description}</Text>
                    </Left>
                    <Text style={{fontSize: 100, fontWeight: '500', color: colorMode}}>
                      {item.main.temp.toFixed(0)}°
                    </Text>
                  </ImageContent>
                </BlockImage>
              </TopBlock>
              <BlockContent>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#00003B', paddingBottom: 10}}>
                  <Text style={{fontSize: 25, color: '#00003B'}}>Weather Info</Text>
                </View>
                <GridBLock>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '50%', flexDirection: 'row', alignItems: 'center'}}>
                      <ImageContainer>
                        <IconImage style={[{resizeMode: 'contain'}]} source={require('../../assets/main/f-l.png')}/>
                      </ImageContainer>
                      <View>
                        <Text style={{color: '#00003B', fontSize: 17, fontWeight: 'bold'}}>Feels like</Text>
                        <Text style={{marginTop: 10, fontSize: 20}}>{item.main.feels_like.toFixed(0)} °</Text>
                      </View>
                    </View>
                    <View style={{width: '50%', flexDirection: 'row',  alignItems: 'center'}}>
                      <ImageContainer>
                        <IconImage style={[{resizeMode: 'contain'}]} source={require('../../assets/main/wind.png')}/>
                      </ImageContainer>
                      <View>
                        <Text style={{color: '#00003B', fontSize: 17, fontWeight: 'bold'}}>Wind</Text>
                        <Text style={{marginTop: 10, fontSize: 20}}>{item.wind.speed} km/h</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: '50%', flexDirection: 'row',  alignItems: 'center'}}>
                      <ImageContainer>
                        <IconImage style={[{resizeMode: 'contain'}]} source={require('../../assets/main/hm.png')}/>
                      </ImageContainer>
                      <View>
                        <Text style={{color: '#00003B', fontSize: 17, fontWeight: 'bold'}}>Humidity</Text>
                        <Text style={{marginTop: 10, fontSize: 20}}>{item.main.humidity} %</Text>
                      </View>
                    </View>
                    <View style={{width: '50%', flexDirection: 'row',  alignItems: 'center'}}>
                      <ImageContainer>
                        <IconImage style={[{resizeMode: 'contain'}]} source={require('../../assets/main/um.png')}/>
                      </ImageContainer>
                      <View>
                        <Text style={{color: '#00003B', fontSize: 17, fontWeight: 'bold'}}>Precipitation</Text>
                        <Text style={{marginTop: 10, fontSize: 20}}>{item.pop * 100} %</Text>
                      </View>
                    </View>
                  </View>
                </GridBLock>
              </BlockContent>
            </MainBLock>

          )
        }}
      />
    </View>
  );
};
const { width } = Dimensions.get('window');

const MainBLock = styled.View`
  width: 100%;
  height: 100%
`
const TopBlock = styled.View`
  height: 470px;
`
const BlockImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`
const BlockContent = styled.View`
  background-color: white;
  height: 400px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  width: 100%;
  padding: 20px;
`
const Top = styled.View`
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
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
  margin-top: 40px;
  padding-bottom: 20px;
  flex-direction: column;
  justify-content: space-between;
  height: 180px
`

const IconImage = styled.Image`
  width: 40px;
  height: 40px;
  
`
const ImageContainer = styled.View`
  width: 60px;
  height: 60px;
  background-color: #e9f8ffa2;
  border-radius: 30px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`


const styles = StyleSheet.create({
  pagination: {
    position: 'absolute',
    top: '55%',
  }
})


export default Main;
