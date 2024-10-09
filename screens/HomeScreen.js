import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const navigation = useNavigation(); // Get the navigation object

  // State management for all fields
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('high school');
  const [selectedZodiac, setSelectedZodiac] = useState('Aries');
  const [selectedLovesign, setSelectedLovesign] = useState('serious');
  const [selectedReligion, setSelectedReligion] = useState('Christianity');
  const [isNearYou, setIsNearYou] = useState(false);
  const [isSmokes, setIsSmokes] = useState(false);
  const [isDrinksBeer, setIsDrinksBeer] = useState(false);
  
  // Lists of options
  const educationLevels = ['high school', 'bachelor', 'master', 'phd', 'other'];
  const zodiacSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const loveSigns = ['serious', 'casual', 'friendship', 'marriage'];
  const religions = ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Jewish', 'Atheist', 'Other'];

  const handleSubmit = async () => {
    // Retrieve user_id from AsyncStorage
    const userId = JSON.parse(await AsyncStorage.getItem('user_id'));

    if (!userId) {
      Alert.alert('Lỗi', 'Không tìm thấy user_id');
      return;
    }

    // Create the object to send to the server
    const postData = {
      user_id: userId,
      min_age: minAge,
      max_age: maxAge,
      education_level: selectedEducation,
      zodiac_sign: selectedZodiac,
      relationship_goal: selectedLovesign,
      religion: selectedReligion,
      nearby: isNearYou ? 1 : 0,
      smoker: isSmokes ? 1 : 0,
      drinker: isDrinksBeer ? 1 : 0,
    };

    try {
      const response = await fetch('http://192.168.2.28/sever/themsothich.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();

      if (data.error) {
        Alert.alert('Lỗi', data.error);
      } else {
        Alert.alert('Thành công', 'Thông tin đã được lưu');
        navigation.navigate('AddPicture'); // Navigate to the next screen
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi gửi dữ liệu');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFC0CB', '#00BFFF']} // Pink to ocean blue gradient
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>Hãy cùng nhau tìm ra người bạn nhé</Text>
          <Image source={require('../assets/rubid.png')} style={styles.image} />

          {/* Age Range Inputs */}
          <LabeledTextInput label="Tuổi từ:" placeholder="Nhập độ tuổi tối thiểu" value={minAge} onChangeText={setMinAge} />
          <LabeledTextInput label="Tuổi đến:" placeholder="Nhập độ tuổi tối đa" value={maxAge} onChangeText={setMaxAge} />

          {/* Dropdowns */}
          <Dropdown label="Trình độ học vấn của bạn là gì:" selectedValue={selectedEducation} setSelectedValue={setSelectedEducation} items={educationLevels} />
          <Dropdown label="Cung Hoàng Đạo của bạn là gì:" selectedValue={selectedZodiac} setSelectedValue={setSelectedZodiac} items={zodiacSigns} />
          <Dropdown label="Mục tiêu tình yêu của bạn là gì:" selectedValue={selectedLovesign} setSelectedValue={setSelectedLovesign} items={loveSigns} />
          <Dropdown label="Tôn giáo của bạn là gì:" selectedValue={selectedReligion} setSelectedValue={setSelectedReligion} items={religions} />

          {/* Switches */}
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Các yếu tố khác:
          </Text>
          <SwitchWithLabel label="Gần bạn" value={isNearYou} onValueChange={setIsNearYou} />
          <SwitchWithLabel label="Hút thuốc" value={isSmokes} onValueChange={setIsSmokes} />
          <SwitchWithLabel label="Uống bia" value={isDrinksBeer} onValueChange={setIsDrinksBeer} />

          {/* Join Now Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Tham gia ngay</Text>
          </TouchableOpacity>
        </ScrollView>
        <StatusBar style="auto" />
      </LinearGradient>
    </View>
  );
}

// Custom Components
const LabeledTextInput = ({ label, placeholder, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.textInput} placeholder={placeholder} keyboardType="numeric" value={value} onChangeText={onChangeText} />
  </View>
);

const Dropdown = ({ label, selectedValue, setSelectedValue, items }) => (
  <View style={styles.dropdownContainer}>
    <Text style={styles.label}>{label}</Text>
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
      style={styles.picker}
    >
      {items.map((item, index) => (
        <Picker.Item label={item} value={item} key={index} />
      ))}
    </Picker>
  </View>
);

const SwitchWithLabel = ({ label, value, onValueChange }) => (
  <View style={styles.switchContainer}>
    <Text style={styles.switchLabel}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the whole screen
  },
  gradient: {
    flex: 1, // Ensures the gradient takes up the whole container
  },
  scrollContent: {
    flexGrow: 1, // Allows ScrollView to take up available space
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontFamily: 'normal',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'normal',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFF5E1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
