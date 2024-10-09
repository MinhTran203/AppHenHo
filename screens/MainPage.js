import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Animated, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

function MainPage({ navigation }) {
  const images = [
    require('../assets/logo.png'),
    require('../assets/pic1.png'),
    require('../assets/pic2.png'),
    require('../assets/pic3.png'),
  ];

  const { width } = Dimensions.get('window');
  const [index, setIndex] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate the slider
      Animated.timing(animation, {
        toValue: -width * ((index + 1) % images.length),
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Update the index after the animation completes
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/backround.png')} style={styles.backgroundImage} />
      <View style={styles.sliderContainer}>
        <Animated.View style={[styles.slider, { transform: [{ translateX: animation }] }]}>
          {images.map((image, i) => (
            <Image key={i} source={image} style={[styles.image, { width }]} />
          ))}
        </Animated.View>
      </View>
      <Text style={styles.brandName}>Rose</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Find out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sliderContainer: {
    width: '80%',
    height: 200,
    overflow: 'hidden',
  },
  slider: {
    flexDirection: 'row',
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
  },
  brandName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#B67A62',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default MainPage;
