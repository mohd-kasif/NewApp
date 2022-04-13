import React from 'react';

import {StyleSheet, Text, View, Image, Linking} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Link} from '@react-navigation/native';

export const OpenCamera = () => {
  const devices = useCameraDevices();
  const device = devices.front;
  if (device == null)
    return (
      <View>
        <Text>Nothing is Here</Text>
      </View>
    );
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};

const MyDrawer = props => {
  const handleCamera = async () => {
    try {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log('Camera Permission', newCameraPermission);
      if (newCameraPermission === 'authorized') {
        props.navigation.navigate('OpenCamera');
      } else {
        Linking.openSettings();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Entypo
          onPress={() => props.navigation.closeDrawer()}
          style={styles.cross_icon}
          name="cross"
          size={20}
        />
        <Text style={styles.profile}>Profile</Text>
        <View style={{position: 'relative'}}>
          <View
            style={{
              width: 36,
              height: 36,
              position: 'absolute',
              borderRadius: 50,
              marginLeft: 158,
              marginTop: 18,
              backgroundColor: '#C4C4C4',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              onPress={() => handleCamera()}
              style={{}}
              name="camera-outline"
              size={22}
            />
          </View>
          <Image
            source={require('../Images/image.jpg')}
            style={styles.profile_image}
          />
        </View>
        <Text style={styles.profile_name}>Mohd Kashif</Text>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  cross_icon: {
    marginLeft: 241.8,
    marginTop: 29,
  },
  search_bar: {
    width: 301,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#020202',
    marginTop: 22,
    marginLeft: 21.5,
  },
  profile_image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 16,
    marginLeft: 103,
    // position: 'absolute',
    zIndex: -1,
  },
  profile: {
    marginTop: 9.8,
    marginLeft: 112,
    fontSize: 18,
    lineHeight: 18,
    color: '#262626',
    fontWeight: 'bold',
  },
  profile_name: {
    marginTop: 19,
    marginLeft: 107,
    fontSize: 16,
    lineHeight: 18,
    color: '#262626',
    marginBottom: 32,
  },
});
export default MyDrawer;
