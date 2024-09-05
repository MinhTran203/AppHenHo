import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Draggable from 'react-native-draggable';

export default function AddPicture() {
  const [images, setImages] = useState([]);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel || response.error) {
        console.log('User cancelled image picker or error occurred');
      } else {
        const selectedImage = { uri: response.assets[0].uri, id: Date.now() };
        setImages([...images, selectedImage]);
      }
    });
  };

  const saveImagesToDB = () => {
    // Logic để lưu ảnh vào cơ sở dữ liệu
    console.log('Saving images to database...', images);
  };

  // Đặt ảnh pic2 cố định từ assets
  const pic2 = require('../assets/pic2.png'); // Adjust the path based on your file structure
  const background = require('../assets/backround.png'); // Path to your background image

  return (
    <ImageBackground source={background} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Thêm ảnh của bạn</Text>
        <TouchableOpacity style={styles.button} onPress={selectImage}>
          <Text style={styles.buttonText}>Chọn ảnh từ máy</Text>
        </TouchableOpacity>

        {/* Slide panel chứa các ảnh đã thêm */}
        <ScrollView horizontal={true} contentContainerStyle={styles.slidePanel}>
          <Image source={pic2} style={styles.slideImage} />
          {images.map((image) => (
            <Image source={{ uri: image.uri }} style={styles.slideImage} key={image.id} />
          ))}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.imageContainer}>
          {images.map((image) => (
            <Draggable key={image.id} x={50} y={50}>
              <Image source={{ uri: image.uri }} style={styles.image} />
            </Draggable>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.saveButton} onPress={saveImagesToDB}>
          <Text style={styles.saveButtonText}>Lưu ảnh</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the whole background
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent', // Set to transparent so background image is visible
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    color: '#fff', // White text color for better visibility on background
  },
  button: {
    backgroundColor: '#FFC0CB', // Pink background color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text color
  },
  slidePanel: {
    marginTop: 20,
    backgroundColor: '#FFFFFF', 
    paddingVertical: 10,
  },
  
  slideImage: {
    width: 200,
    
    height: 200,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  saveButton: {
    backgroundColor: '#FF99CC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
