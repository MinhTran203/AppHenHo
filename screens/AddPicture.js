import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Draggable from 'react-native-draggable';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function AddPicture() {
  const [images, setImages] = useState([]);
  const [photoOrder, setPhotoOrder] = useState(1);
  const navigation = useNavigation(); // Get navigation instance

  // Request permission to access media library
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
      }
    })();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = { uri: result.assets[0].uri, id: Date.now() };
        setImages([...images, selectedImage]);
      }
    } catch (error) {
      console.log('Error selecting image: ', error);
    }
  };

  const uploadImage = async (uri, order) => {
    const userId = JSON.parse(await AsyncStorage.getItem('user_id'));
  
    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy user_id');
      return;
    }
  
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('photo_order', order);
    formData.append('image', {
      uri: uri,
      name: `photo_${order}.jpg`,
      type: 'image/jpeg',
    });
  
    try {
      const response = await axios.post('http://192.168.2.28/sever/themanh.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.error) {
        Alert.alert('Upload Failed', response.data.error);
      } else {
        Alert.alert('Success', 'Image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };
  

  const saveImages = async () => {
    try {
      for (const [index, image] of images.entries()) {
        await uploadImage(image.uri, index + 1); // Upload images with their respective order
      }
      //navigation.navigate('DangNhap'); // Navigate to DangNhap screen
    } catch (error) {
      console.error('Error saving images: ', error);
      Alert.alert('Error', 'Failed to save images');
    }
  };
  

  return (
    <ImageBackground source={require('../assets/backround.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Thêm ảnh của bạn</Text>
        <TouchableOpacity style={styles.button} onPress={selectImage}>
          <Text style={styles.buttonText}>Chọn ảnh từ máy</Text>
        </TouchableOpacity>

        <ScrollView horizontal={true} contentContainerStyle={styles.slidePanel}>
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

        <TouchableOpacity style={styles.saveButton} onPress={saveImages}>
          <Text style={styles.saveButtonText}>Lưu và Di chuyển</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#FFC0CB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: '#00BFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
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
