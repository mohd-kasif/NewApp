import {TabRouter} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const designWidth = 390;
const designHeight = 844;
const otpArray = Array(4).fill('');
let newInputIndex = 0;
const Verification = ({navigation, route}) => {
  const input = useRef();
  console.log('number', route.params);
  const [otp, setOtp] = useState({0: '', 1: '', 2: '', 3: ''});
  const [nextInputIndex, setNextInputIndex] = useState(0);
  // let n_otp = '';
  let OTP = '';

  const handleOTPChange = (text, index) => {
    const newOTP = {...otp};
    newOTP[index] = text;
    setOtp(newOTP);
    const lastIndex = otpArray.length - 1;
    if (!text) {
      newInputIndex = index === 0 ? 0 : index - 1;
    } else {
      newInputIndex = index === lastIndex ? lastIndex : index + 1;
    }

    setNextInputIndex(newInputIndex);
  };
  // console.log('otp5', otp);
  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);

  useEffect(() => {
    fetchData();
  });
  const fetchData = async () => {
    try {
      const res = await fetch('http://10.0.2.2:3002/getPhone', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          phone_num: route.params,
        }),
      });
      // console.log('response', res);
      const data = await res.json();
      // console.log('data', data);
      OTP = data[0].otp;
      console.log(OTP);
      // OTP = data.filter(item => item.ph_num === route.params);
      // var b = Object.values(otp);
      // // console.log(b);
      // var n_otp = '';
      // for (let i = 0; i < b.length; i++) {
      //   n_otp += b[i];
      // }
      // console.log(OTP);
    } catch (e) {
      console.log('error', e);
    }
  };
  const handleSubmit = () => {
    // console.log('backend', OTP[0].otp);
    // console.log(typeof OTP[0].otp);
    console.log(OTP);
    const b = Object.values(otp);
    let n_otp = '';
    for (let i = 0; i < b.length; i++) {
      n_otp += b[i];
    }
    console.log('frontedn', n_otp);
    console.log(typeof n_otp);
    if (OTP == n_otp) {
      navigation.navigate('Dashboard');
    } else {
      ShowToast();
      console.log('toast');
    }
  };
  // console.log('otp', otp);
  //   console.log(Object.keys(otp));
  // const isEmpty = Object.keys(otp).every(item => otp[item]);
  // console.log(isEmpty);

  // let flag = true;
  // for (const [key, value] of Object.entries(otp)) {
  //   if (Number(value) !== Number(key) + 1) {
  //     flag = false;
  //   }
  // }
  const ShowToast = () => {
    ToastAndroid.show(
      'Wrong OTP, please try again!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  // console.log(otp);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topTextContainer}>
        <Text style={{fontSize: 18, lineHeight: 22, color: '#000000'}}>
          Enter the{' '}
          <Text style={{fontWeight: 'bold', lineHeight: 22}}>4 digit</Text> OTP
          which you{'\n'}have received on your mobile no.{'\n'}
          {'          '}
          <Text>+91 - {route.params}</Text>
          {'  '}
          <Pressable onPress={() => navigation.push('Login')}>
            <Text style={{fontSize: 14, color: '#2775EB'}}>Edit</Text>
          </Pressable>
        </Text>
      </View>
      <View style={styles.otpContainer}>
        {otpArray.map((item, index) => {
          return (
            <View style={styles.inputContainer} key={index}>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  textAlign: 'center',
                  fontSize: 28,
                  color: '#333333',
                }}
                onChangeText={text => handleOTPChange(text, index)}
                value={otp[index]}
                maxLength={1}
                placeholder="-"
                placeholderTextColor="#757575"
                keyboardType="phone-pad"
                ref={nextInputIndex === index ? input : null}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={{fontSize: 14, color: '#333333'}}>
          Code not received?{' '}
        </Text>
        <Pressable>
          <Text style={{color: '#2775EB'}}>Resend</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          // disabled={}
          onPress={handleSubmit}
          style={({pressed}) => [{opacity: 1}, styles.submitButton]}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // marginTop: (((58 / Height) * 100) / 100) * Height,
    // marginLeft: (((44 / Width) * 100) / 100) * Width,
    // marginRight: (((44 / Width) * 100) / 100) * Width,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: (((83 / Height) * 100) / 100) * Height,
    width: 210,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  topTextContainer: {
    marginTop: (((58 / Height) * 100) / 100) * Height,
    marginLeft: (((44 / Width) * 100) / 100) * Width,
    marginRight: (((44 / Width) * 100) / 100) * Width,
  },
  bottomTextContainer: {
    marginTop: (((24 / Height) * 100) / 100) * Height,
    flexDirection: 'row',
  },
  submitButton: {
    width: (342 / designWidth) * Width,
    height: (48 / designHeight) * Height,
    // marginLeft: (((24 / Width) * 100) / 100) * Width,
    marginLeft: (24 / designWidth) * Width,
    borderRadius: 8,
    backgroundColor: '#7B7B7B',
    // marginTop: (((126 / Height) * 100) / 100) * Height,
    marginTop: (126 / designHeight) * Height,
    marginRight: (24 / designWidth) * Width,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: (((14 / Height) * 100) / 100) * Height,
  },
});
export default Verification;
