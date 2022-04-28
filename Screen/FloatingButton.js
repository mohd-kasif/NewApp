import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const FloatingButton = props => {
  var animation = useRef(new Animated.Value(0)).current;
  console.log('animation', animation);
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };
  console.log(open);
  const menuSpin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  const locationSpin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });
  const thumbSpin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -120],
  });
  const heartSpin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -180],
  });
  return (
    <View style={[styles.container, props.style]}>
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            {
              transform: [
                {scale: animation},
                {
                  translateY: heartSpin,
                },
                {perspective: 1000},
              ],
            },
          ]}>
          <Entypo name="heart-outlined" size={30} color="#525151" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            {
              transform: [
                {scale: animation},
                {
                  translateY: thumbSpin,
                },
                {perspective: 1000},
              ],
            },
          ]}>
          <Entypo name="thumbs-up" size={30} color="#525151" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            {
              transform: [
                {scale: animation},
                {
                  translateY: locationSpin,
                },
                {perspective: 1000},
              ],
            },
          ]}>
          <Entypo name="location-pin" size={30} color="#525151" />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View
          style={[
            styles.button,
            styles.menu,
            {transform: [{rotate: menuSpin}, {perspective: 1000}]},
          ]}>
          <Entypo name="plus" size={38} color="#FFF" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    position: 'absolute',
    alignItems: 'flex-end',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#525151',
    shadowOpacity: 0.3,
    shadowOffset: {height: 10},
  },
  menu: {
    backgroundColor: '#525151',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#FFF',
    // alignItems: 'center',
    // justifyContent: 'center',
    right: 5,
  },
});

export default FloatingButton;
