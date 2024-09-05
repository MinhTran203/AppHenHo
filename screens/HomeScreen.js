import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation(); // Get the navigation object

  const [selectedEducation, setSelectedEducation] = useState('Đại Học');
  const [selectedZodiac, setSelectedZodiac] = useState('Bạch Dương (Aries)');
  const [selectedLovesign, setSelectedLovesign] = useState('Yêu nghiêm túc');
  const [selectedReligion, setSelectedReligion] = useState('Không tôn giáo');
  const [isNearYou, setIsNearYou] = useState(false);
  const [isSmokes, setIsSmokes] = useState(false);
  const [isDrinksBeer, setIsDrinksBeer] = useState(false);

  // Lists of options
  const educationLevels = ['Đại Học', 'Cao Đẳng', 'Đi làm', 'Mới ra trường'];
  const zodiacSigns = [
    'Bạch Dương (Aries)', 'Kim Ngưu (Taurus)', 'Song Tử (Gemini)', 'Cự Giải (Cancer)',
    'Sư Tử (Leo)', 'Xử Nữ (Virgo)', 'Thiên Bình (Libra)', 'Bọ Cạp (Scorpio)',
    'Nhân Mã (Sagittarius)', 'Ma Kết (Capricorn)', 'Bảo Bình (Aquarius)', 'Song Ngư (Pisces)'
  ];
  const loveSigns = ['Yêu nghiêm túc', 'Bạn Bè', 'Mối quan hệ không ràng buộc', 'Người tâm sự'];
  const religions = ['Không tôn giáo', 'Phật giáo', 'Thiên Chúa giáo', 'Hồi giáo', 'Khác'];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFC0CB', '#00BFFF']} // Pink to ocean blue gradient
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>Hãy cùng nhau tìm ra ghu bạn nhé</Text>
          <Image source={require('../assets/rubid.png')} style={styles.image} />

          {/* Age Range Inputs */}
          <LabeledTextInput label="Tuổi từ:" placeholder="Nhập độ tuổi tối thiểu" />
          <LabeledTextInput label="Tuổi đến:" placeholder="Nhập độ tuổi tối đa" />

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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddPicture')}>
            <Text style={styles.buttonText}>Tham gia nga</Text>
          </TouchableOpacity>
        </ScrollView>
        <StatusBar style="auto" />
      </LinearGradient>
    </View>
  );
}

// Custom Components
const LabeledTextInput = ({ label, placeholder }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.textInput} placeholder={placeholder} keyboardType="numeric" />
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
  Text: {
    fontSize: 16,
    fontWeight: 'bold',
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
    paddingHorizontal: 35,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});
