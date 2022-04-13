import React from 'react';

import {Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerStack from './DrawerStack';

const Tab = createBottomTabNavigator();
const WatchList = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Watchlist!</Text>
    </View>
  );
};

const Portfolio = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Portfolio!</Text>
    </View>
  );
};
const Notification = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notification!</Text>
    </View>
  );
};
const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#683FDB',
        headerShown: false,
      }}>
      <Tab.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={WatchList}
        options={{
          tabBarLabel: 'Portfolio',
          tabBarIcon: ({color, size}) => (
            <Icon name="briefcase" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={Portfolio}
        options={{
          tabBarLabel: 'Watchlist',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-bookmarks" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;
