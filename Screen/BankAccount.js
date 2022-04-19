import React, {useEffect, useRef} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

import Carousel from 'react-native-anchor-carousel';

import Icon from 'react-native-vector-icons/FontAwesome';
const designWidth = 390;
const designHeight = 844;
const BankAccount = ({navigation}) => {
  const data = [
    {
      title: 'Carousel 01',
      rating: 76,
      price: 1200,
    },
    {
      title: 'Carousel 02',
      rating: 76,
      price: 1200,
    },
    {
      title: 'Carousel 03',
      rating: 76,
      price: 1200,
    },
    {
      title: 'Carousel 04',
      rating: 76,
      price: 1200,
    },
    {
      title: 'Carousel 05',
      rating: 76,
      price: 1200,
    },
    {
      title: 'Carousel 06',
      rating: 76,
      price: 1200,
    },
  ];
  const carouselRef = useRef(null);
  useEffect(() => {
    carouselRef.current.scrollToIndex(1);
  });

  function renderSecond({item, index}) {
    const {title, rating, price} = item;
    return (
      <View>
        <View
          style={styles.sec_card}
          onPress={() => {
            if (index === 0) {
              carouselRef.current.scrollToIndex(5);
            } else if (index === data.length - 1) {
              carouselRef.current.scrollToIndex(1);
            } else {
              carouselRef.current.scrollToIndex(index);
            }
          }}></View>
        <View style={styles.lowerContainer}>
          <Text>{title}</Text>
          <Text>{rating}</Text>
          <Text>{price}</Text>
        </View>
      </View>
    );
  }
  function renderItems({item, index}) {
    const {title, rating, price} = item;
    // console.log(item);
    return (
      <View>
        <View
          style={styles.card}
          onPress={() => {
            if (index === 0) {
              carouselRef.current.scrollToIndex(5);
            } else if (index === data.length - 1) {
              carouselRef.current.scrollToIndex(1);
            } else {
              carouselRef.current.scrollToIndex(index);
            }
          }}></View>
        <View style={styles.lowerContainer}>
          <Text>{title}</Text>
          <Text>{rating}</Text>
          <Text>{price}</Text>
        </View>
      </View>
    );
  }
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          style={styles.drawer_icon}
          size={27}
          name="bars"
          onPress={() => navigation.openDrawer()}
          color="#020202"
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#757575"
          style={styles.search_bar}
        />
      </View>
      <View>
        <Text style={styles.heading}>Intro to Stock Markets</Text>
        <Text style={styles.sub_heading}>
          Watch these videos and if you like subscribe to{'\n'}our course to
          further excel in market
        </Text>
      </View>
      <View>
        <Carousel
          data={data}
          renderItem={renderItems}
          itemWidth={(267 / designWidth) * Width}
          inActiveOpacity={0.3}
          containerWidth={Width}
          ref={carouselRef}
        />
      </View>
      <View>
        <Text style={styles.second_heading}>Trading and Investing</Text>
        <Text style={styles.sub_heading}>
          Watch these videos and if you like subscribe to{'\n'}our course to
          further excel in market
        </Text>
      </View>
      <View>
        <Carousel
          data={data}
          renderItem={renderSecond}
          itemWidth={(255 / designWidth) * Width}
          inActiveScale={1}
          separatorWidth={15}
          containerWidth={Width}
          ref={carouselRef}
        />
      </View>
      <View>
        <Text style={styles.second_heading}>Equities, Futures and Options</Text>
        <Text style={styles.sub_heading}>
          Watch these videos and if you like subscribe to{'\n'}our course to
          further excel in market
        </Text>
      </View>
      <View>
        <Carousel
          data={data}
          renderItem={renderSecond}
          itemWidth={(255 / designWidth) * Width}
          inActiveScale={1}
          separatorWidth={15}
          containerWidth={Width}
          ref={carouselRef}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  drawer_icon: {
    marginLeft: (20.5 / designWidth) * Width,
    marginTop: (33 / designHeight) * Height,
  },
  search_bar: {
    width: (301 / designWidth) * Width,
    height: (40 / designHeight) * Height,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#020202',
    marginTop: (22 / designHeight) * Height,
    marginLeft: (21 / designWidth) * Width,
    marginRight: (20 / designWidth) * Width,
    padding: 10,
    color: '#757575',
  },
  heading: {
    marginLeft: (16 / designWidth) * Width,
    marginTop: (32 / designHeight) * Height,
    // marginRight: (129 / designWidth) * Width,
    fontSize: 24,
    // lineHeight: 22,
    color: '#262626',
    fontWeight: '400',
  },
  sub_heading: {
    marginLeft: 16,
    marginTop: 9,
    fontSize: 16,
    lineHeight: 18,
    color: '#262626',
  },
  card: {
    backgroundColor: '#A8A8A8',
    height: (340 / designHeight) * Height,
    borderRadius: 24,
    marginTop: 19,
  },
  lowerContainer: {
    alignItems: 'center',
  },
  second_heading: {
    marginTop: 42,
    marginLeft: 16,
    fontSize: 24,
    lineHeight: 24,
    color: '#262626',
  },
  sec_card: {
    backgroundColor: '#A8A8A8',
    height: (255 / designHeight) * Height,
    marginRight: 0,
    paddingRight: 0,
    marginTop: 23,
  },
});
export default BankAccount;
