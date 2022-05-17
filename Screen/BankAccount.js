import React, {useEffect, useRef, useState} from 'react';

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
// import Carousel from 'react-native-snap-carousel';
// import {FloatingMenu} from 'react-native-floating-action-menu';
import FloatingButton from './FloatingButton';

import Icon from 'react-native-vector-icons/FontAwesome';
const designWidth = 390;
const designHeight = 844;
const BankAccount = ({navigation}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
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
  const items = [{}, {}, {}];
  const Itemressed = (item, index) => {
    console.log(item, index);
  };
  const handleToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const carouselRef = useRef(null);
  useEffect(() => {
    carouselRef.current.scrollToIndex(1);
  });

  function renderSecond({item, index}) {
    const {title, rating, price} = item;
    return (
      <View>
        <View style={styles.sec_card}></View>
        <View style={styles.lowerContainer}>
          <Text style={{color: '#262626'}}>{title}</Text>
          <Text style={{color: '#262626'}}>{rating}</Text>
          <Text style={{color: '#262626'}}>{price}</Text>
        </View>
      </View>
    );
  }
  function renderItems({item, index}) {
    const {title, rating, price} = item;
    // console.log('index', index);
    return (
      <View>
        <View style={styles.card}></View>
        <View style={styles.lowerContainer}>
          <Text style={{color: '#262626'}}>{title}</Text>
          <Text style={{color: '#262626'}}>{rating}</Text>
          <Text style={{color: '#262626'}}>{price}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewStyle}>
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
          <Text style={styles.second_heading}>
            Equities, Futures and Options
          </Text>
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
      <View>
        <FloatingButton style={{bottom: -660, right: 20}} />
      </View>
    </View>
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
  floatingMenu: {
    width: '100%',
    // height: '100%',
    position: 'relative',
    // color: 'black',
  },
  mainView: {
    position: 'relative',
    flex: 1,
  },
  scrollViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default BankAccount;
