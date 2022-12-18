import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Main from './screens/Main';
import Search from './screens/Search';
import Map from './screens/Map';

//Screen names
const homeName = "Location";
const detailsName = "Search";
const settingsName = "Map";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          "tabBarActiveTintColor": "white",
          "tabBarInactiveTintColor": "grey",
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 0,
            display: "none"
          },
          tabBarIconStyle: {
            width: 50,
            height: 40,
            borderRadius: 10,
          },
          tabBarStyle: {
            backgroundColor: '#00003b',
            borderRadius: 20,
            width: '95%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 10,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            shadowColor: 'black',
            shadowOffset: { height: 5 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 10,
            borderTopWidth: 0,
            justifyContent: 'center',
            alignItems: 'center'
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'location' : 'location-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'ios-search' : 'ios-search-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'map' : 'map-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen options={{headerShown: false}} name={homeName} component={Main} />
        <Tab.Screen options={{headerShown: false}} name={detailsName} component={Search} />
        <Tab.Screen options={{headerShown: false}} name={settingsName} component={Map} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
