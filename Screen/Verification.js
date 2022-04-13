import {TabRouter} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const otpArray = Array(4).fill('');
let newInputIndex = 0;
const Verification = ({navigation, route}) => {
  const input = useRef();
  console.log(route.params);
  //   console.log(otp);
  const [otp, setOtp] = useState({0: '', 1: '', 2: '', 3: ''});
  const [nextInputIndex, setNextInputIndex] = useState(0);

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
  //   console.log('otp5', otp);
  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);
  console.log('otp', otp);
  //   console.log(Object.keys(otp));
  const isEmpty = Object.keys(otp).every(item => otp[item]);
  console.log(isEmpty);

  let flag = true;
  for (const [key, value] of Object.entries(otp)) {
    if (Number(value) !== Number(key) + 1) {
      flag = false;
    }
  }
  const ShowToast = () => {
    ToastAndroid.show(
      'OTP Incorrect, please try again!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
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
                }}
                onChangeText={text => handleOTPChange(text, index)}
                value={otp[index]}
                maxLength={1}
                placeholder="-"
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
          disabled={isEmpty ? false : true}
          onPress={() =>
            flag ? navigation.navigate('Dashboard') : ShowToast()
          }
          style={({pressed}) => [
            {opacity: !isEmpty ? 0.5 : 1},
            styles.submitButton,
          ]}>
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
    width: 342,
    height: 48,
    marginLeft: (((24 / Width) * 100) / 100) * Width,
    borderRadius: 8,
    backgroundColor: '#7B7B7B',
    marginTop: (((126 / Height) * 100) / 100) * Height,
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
