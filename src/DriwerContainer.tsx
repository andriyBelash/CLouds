import React from 'react';
import { View, Text, Image, Linking, Pressable, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';

import Main from './screens/Main';
import Search from './screens/Search';
import Map from './screens/Map';

const url = 'https://github.com/andriyBelash/CLouds';



const DriwerContainer = ({navigation} : any) => {
  function  handlePress() {
    Linking.canOpenURL(url).then((supported) => {
      return Linking.openURL(url);
    });
  }

  const Open = () => {
    navigation.openDrawer();
  }

  const CustomDriwer = (props: any) => {
    return (
      <DrawerContentScrollView {...props}
        contentContainerStyle={{backgroundColor: "#00003b", flex: 1}}
      >
        <Pressable onPress={handlePress} style={{height: 120, marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
          <Image style={{width: 60, height: 60, borderRadius: 50, marginLeft: 20 }} source={{uri: 'https://avatars.githubusercontent.com/u/102928823?s=40&v=4'}}/>
          <View>
            <Text style={{marginLeft: 20, color: 'white', fontSize: 20}}>Andriy Belash</Text>
            <Text style={{marginLeft: 20, color: 'white', fontSize: 12, marginTop: 10}}>(Project link to github)</Text>
          </View>
        </Pressable>
        <DrawerItemList {...props}></DrawerItemList>
      </DrawerContentScrollView>
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <CustomDriwer {...props}/>} initialRouteName='Main'
        screenOptions={{
          drawerActiveBackgroundColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerActiveTintColor: '#00003b',
          drawerStatusBarAnimation: 'fade',
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);

            return <View style={styles.icon}>
                    <Ionicons onPress={() => navigation.openDrawer()} name='menu' size={40} color='#00003b' />
                  </View>;
          }

        }}
      >
        <Drawer.Screen name="Location" component={Main} options={{
          drawerIcon: ({color}) =>(
            <Ionicons name='location-outline' size={22} color={color} />
          )
        }}
        />
        <Drawer.Screen name="Search to city" component={Search} options={{
          drawerIcon: ({color}) =>(
            <Ionicons name='search-outline' size={22} color={color} />
          )
        }}/>
        <Drawer.Screen name="Map" component={Map} options={{
          drawerIcon: ({color}) =>(
            <Ionicons name='map-outline' size={22} color={color} />
          )
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 50,
    right: 10,
    alignItems: 'flex-end',
    width: '100%',
  }
})

export default DriwerContainer;
