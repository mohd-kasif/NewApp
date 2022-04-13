import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BankAccount from './BankAccount';
import Security from './Security';
import Whatsapp from './Whatsapp';
import Help from './HelpSupport';
import Refer from './Referrel';
import Logout from './Logout';
import MyDrawer from './MyDrawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <MyDrawer {...props} />}
      screenOptions={{headerShown: false, drawerLabelStyle: {marginLeft: -25}}}>
      {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
      <Drawer.Screen
        name="Bank account details"
        component={BankAccount}
        options={{
          drawerIcon: ({color}) => <Icon name="bank" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Security"
        component={Security}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="security" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Receive updates on Whatsapp"
        component={Whatsapp}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="whatsapp" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help & Support"
        component={Help}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="help-circle-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Refer and earn"
        component={Refer}
        options={{
          drawerIcon: ({color}) => <Icon name="gift" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="power-off" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
