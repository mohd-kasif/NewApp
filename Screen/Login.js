import React, {useState} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Google from '../Images/icons8-google.svg';
// import Verification from './Verification';
// const {height, width} = Dimensions.get('window');

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const designWidth = 390;
const designHeight = 844;

const Login = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  // console.log('Height', Height);
  // console.log('width', Width);
  // console.log('Phone No Top Margin', (((35 / Height) * 100) / 100) * Height);
  // console.log(phone.length);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView>
          <Image
            style={styles.logo}
            source={{
              uri: 'data:image/png;base64,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',
            }}
          />
          <Image
            style={styles.second_logo}
            source={{
              uri: 'https://image.shutterstock.com/image-vector/black-businesswoman-sitting-on-couch-260nw-1798709026.jpg',
            }}
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
            onPress={() => navigation.navigate('Verification', phone)}
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
