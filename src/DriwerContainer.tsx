import React from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

import Main from './screens/Main';
import Search from './screens/Search';
import Map from './screens/Map';

const DriwerContainer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Main'>
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="Map" component={Map} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DriwerContainer;
