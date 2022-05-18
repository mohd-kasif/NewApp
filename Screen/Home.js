import React from 'react';

import {StyleSheet, Text, View, Dimensions} from 'react-native';
// const Width = Dimensions.get('window').width;
// const Height = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
