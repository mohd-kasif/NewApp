import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Google from '../Images/icons8-google.svg';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import jwt_decode from 'jwt-decode';

// import Verification from './Verification';
// const {height, width} = Dimensions.get('window');

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const designWidth = 390;
const designHeight = 844;

const Login = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [verified, setVerified] = useState(false);
  // console.log('Height', Height);
  // console.log('width', Width);
  // console.log('Phone No Top Margin', (((35 / Height) * 100) / 100) * Height);
  // console.log(phone.length);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '644587669043-ug40kh5qqbaj36djdngqhe7s3tp8k7dv.apps.googleusercontent.com',
    });
  }, []);
  const signinwithgoogle = async e => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // console.log(googleCredential);
      // console.log(jwt_decode(googleCredential.token));
      const decoded = jwt_decode(googleCredential.token);
      await auth().signInWithCredential(googleCredential);
      // setName(decoded.name);
      // setUrl(decoded.picture);
      // setVerified(decoded.email_verified);
      if (decoded.email_verified) {
        navigation.navigate('Dashboard', decoded);
      }
      console.log('decode', decoded);
    } catch (e) {
      console.log(e);
    }
  };
  const ShowToast = () => {
    ToastAndroid.show(
      'Phone Number Already Exist!!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  const handleLogin = async e => {
    try {
      const response = await fetch('http://10.0.2.2:3002/insert', {
        //10.0.2.2
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          phone_num: phone.toString(),
        }),
      });
      const data = await response.json();
      // console.log(data);
      if (data.length !== 0) {
        navigation.navigate('Verification', phone);
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView>
          <Image style={styles.logo} source={require('../Images/Frame.png')} />
          <Image
            style={styles.second_logo}
            source={require('../Images/login.png')}
          />
          <Text style={styles.login_text}>Log in</Text>
          <Text style={styles.phone_no}>Phone no.</Text>
          <TextInput
            onChangeText={val => setPhone(val)}
            keyboardType="phone-pad"
            value={phone}
            maxLength={10}
            style={styles.input_phone}
            placeholder="Enter phone no"
            placeholderTextColor="#000000"
          />
          <Pressable
            onPress={handleLogin}
            style={({pressed}) => [
              {opacity: pressed ? 0.5 : 1},
              {backgroundColor: phone.length === 10 ? '#FF9900' : '#D6D6D6'},
              styles.login_button,
            ]}>
            <Text style={styles.login_button_text}>Log in</Text>
          </Pressable>
        </KeyboardAvoidingView>
        <Pressable
          style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1},
            styles.apple_login_button,
          ]}>
          <Icon
            style={styles.apple_logo}
            color={'#000000'}
            name="apple"
            size={30}
          />
          <Text style={styles.apple_button_text}>Log in with Apple ID</Text>
        </Pressable>
        <Pressable
          onPress={signinwithgoogle}
          style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1},
            styles.apple_login_button,
          ]}>
          <Google style={styles.google_logo} />
          <Text style={styles.google_button_text}>Log in with Google</Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 116,
            marginTop: 24,
            marginBottom: 44,
          }}>
          <Text style={{color: '#333333', fontSize: 14, lineHeight: 15}}>
            New on Kuants?
          </Text>
          <Pressable>
            <Text
              style={{
                color: '#2775EB',
                fontSize: 14,
                lineHeight: 15,
                marginLeft: 3,
              }}>
              Sign up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    // flexDirection: 'column',
    // flex: 1,
    backgroundColor: '#ffff',
    // alignItems: "center",
    // justifyContent: "center",
  },

  logo: {
    width: (88 / designWidth) * Width,
    height: (44 / designHeight) * Height,
    marginTop: (61 / designHeight) * Height,
    marginLeft: (151 / designWidth) * Width,
    // marginRight: 151,
    resizeMode: 'contain',
    backgroundColor: '#ffff',
  },
  second_logo: {
    width: (303 / designWidth) * Width,
    height: (194 / designHeight) * Height,
    marginLeft: (41 / designWidth) * Width,
    // marginRight: 46,
    marginTop: (55 / designHeight) * Height,
  },
  login_text: {
    // width: (71 / designWidth) * Width,
    // height: (28 / designHeight) * Height,
    opacity: 0.8,
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 24,
    lineHeight: 28,
    marginLeft: (26 / designWidth) * Width,
    marginTop: (77 / designHeight) * Height,
    // marginLeft: 26,
    // marginRight: 77,
  },
  phone_no: {
    // width: 66,
    // height: 18,
    // marginLeft: (((26 / Width) * 100) / 100) * Width,
    // marginTop: (((35 / Height) * 100) / 100) * Height,
    marginLeft: (26 / designWidth) * Width,
    marginTop: (35 / designHeight) * Height,
    opacity: 0.8,
    fontSize: 14,
    lineHeight: 18,
    color: '#333333',
  },
  input_phone: {
    width: (342 / designWidth) * Width,
    marginRight: 24,
    marginLeft: 24,
    opacity: 0.5,
    marginTop: 38,
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 1,
    fontSize: 16,
    color: '#333333',
    padding: -10,
  },
  login_button: {
    width: (342 / designWidth) * Width,
    height: (48 / designHeight) * Height,
    marginTop: (32 / designHeight) * Height,
    marginLeft: (24 / designWidth) * Width,
    // marginRight:24,
    borderRadius: 8,
    // backgroundColor: '#D6D6D6',
  },
  apple_login_button: {
    flexDirection: 'row',
    width: (342 / designWidth) * Width,
    height: (48 / designHeight) * Height,
    marginTop: (16 / designHeight) * Height,
    marginLeft: (24 / designWidth) * Width,
    // marginRight:24,
    borderRadius: 8,
    backgroundColor: '#ffff',
    borderColor: '#666666',
    borderWidth: 1,
  },
  apple_button_text: {
    width: 147,
    height: 20,
    marginTop: 14,
    marginLeft: 52,
    color: '#000000',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    // marginRight:24,
  },
  google_button_text: {
    width: 138,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 56,
    marginTop: 14,
    color: '#000000',
    fontWeight: '400',
    height: 20,
  },
  login_button_text: {
    width: (138.48 / designWidth) * Width,
    height: (20 / designHeight) * Height,
    marginTop: (14 / designHeight) * Height,
    marginLeft: (140 / designWidth) * Width,
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    // marginRight:24,
  },
  apple_logo: {
    marginTop: (9 / designHeight) * Height,
    marginLeft: (16 / designWidth) * Width,
  },
  google_logo: {
    width: 30,
    height: 30,
    marginTop: 9,
    marginLeft: 16,
  },
});

export default Login;
