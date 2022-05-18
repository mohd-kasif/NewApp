import React, {useRef, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
import NativeAsyncLocalStorage from 'react-native/Libraries/Storage/NativeAsyncLocalStorage';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const designWidth = 390;
const designHeight = 844;

export const OpenCamera = ({navigation, route}) => {
  const camera = useRef(null);
  const [camflip, setCameraflip] = useState(true);
  const [imagePath, setImagepath] = useState('');
  const takePhoto = async () => {
    try {
      const photo = await camera.current.takePhoto({flash: 'off'});
      setImagepath(photo.path);
      console.log(photo.path);
      // console.log(imagePath);
      // console.log('route', route);
      // console.log(`file:/${imagePath}`);
    } catch (e) {
      console.log(e);
    }
  };
  const devices = useCameraDevices();
  const device = camflip ? devices.front : devices.back;
  if (device == null)
    return (
      <View>
        <Text>Nothing is Here</Text>
      </View>
    );
  return (
    <View>
      <View style={styles.sub_container}>
        <Ionicons
          name="chevron-back-sharp"
          size={30}
          color="#020202"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.takePhoto}>Take a photo</Text>
        <View></View>
      </View>
      <View style={styles.cam_container}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
          ref={camera}
        />
        <View style={styles.cam_buttons}>
          <TouchableOpacity onPress={takePhoto}>
            <MaterialIcon
              name="camera"
              size={60}
              color="red"
              // style={styles.camera}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCameraflip(!camflip)}
            style={{marginLeft: (80 / designWidth) * Width}}>
            <Ionicons name="camera-reverse" size={50} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.saveButton, styles.shadow]}>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
          onPress={() => navigation.navigate('Dashboard', imagePath)}>
          <Text style={styles.saveText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyDrawer = props => {
  console.log('my drawer', props);
  const handleCamera = async () => {
    try {
      const newCameraPermission = await Camera.requestCameraPermission();
      // console.log('Camera Permission', newCameraPermission);
      if (newCameraPermission === 'authorized') {
        props.navigation.navigate('OpenCamera');
      } else {
        Linking.openSettings();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Are you really want to Log out?',
      [
        {text: 'Cancel', onPress: () => null},
        {
          text: 'Confirm',
          onPress: () => {
            props.navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <Entypo
          onPress={() => props.navigation.closeDrawer()}
          style={styles.cross_icon}
          name="cross"
          size={24}
          color="#020202"
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
        <View style={{marginTop: 10}}>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Icon
              name="power-off"
              size={20}
              color="grey"
              style={styles.logout}
            />
            <Text style={styles.logot_text}>Logout</Text>
          </TouchableOpacity>
        </View>
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
  camera: {
    marginBottom: (30 / designHeight) * Height,
  },
  sub_container: {
    marginTop: (34 / designHeight) * Height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: (24 / designWidth) * Width,
  },
  takePhoto: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '700',
    color: '#262626',
  },
  cam_container: {
    width: (342 / designWidth) * Width,
    height: (491 / designHeight) * Height,
    marginLeft: (24 / designWidth) * Width,
    marginTop: (37 / designHeight) * Height,
  },
  cam_buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: (409 / designHeight) * Height,
  },
  saveButton: {
    width: (342 / designWidth) * Width,
    height: (48 / designHeight) * Height,
    marginLeft: (24 / designWidth) * Width,
    borderRadius: 8,
    backgroundColor: '#7B7B7B',
    // marginTop: (((126 / Height) * 100) / 100) * Height,
    marginTop: (22 / designHeight) * Height,
    // marginRight: (24 / designWidth) * Width,
    // paddingVertical: 45,
    // paddingHorizontal: 25,
    marginVertical: 10,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: (((14 / Height) * 100) / 100) * Height,
  },
  shadow: {
    shadowColor: '#7B7B7B',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logout: {
    flexDirection: 'row',
    marginLeft: 9,
  },
  logot_text: {
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: 9,
  },
});
export default MyDrawer;
