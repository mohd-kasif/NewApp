import React from 'react';
import {Text, View} from 'react-native';

const Logout = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#262626'}}>You have been logout successfully.</Text>
    </View>
  );
};

export default Logout;
