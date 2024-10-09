import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('male');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  const handleRegister = async () => {
    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp');
      return;
    }
  
    // Tạo đối tượng dữ liệu để gửi lên server
    const userData = {
      email,
      password,
      name,
      birth_date: birthDate,
      gender,
      bio,
      location,
    };
  
    try {
      // Gửi dữ liệu đến server
      const response = await fetch('http://192.168.2.28/sever/themkhachhang.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
  
      if (data.error) {
        Alert.alert('Lỗi', data.error);
      } else {
        try {
          // Gọi API để lấy thông tin người dùng cuối cùng
          const response = await fetch('http://192.168.2.28/sever/gettaikoanganhat.php');
          const data = await response.json();
  
          if (data.user_id) {
            // Save user_id as a string in AsyncStorage
            await AsyncStorage.setItem('user_id', JSON.stringify(data.user_id));
  
            Alert.alert('Thành công', 'Đã thêm người dùng mới');
            navigation.navigate('Home');
          } else {
            Alert.alert('Thông báo', 'Không tìm thấy user_id');
          }
        } catch (error) {
          console.error('Error retrieving user_id:', error);
          Alert.alert('Lỗi', 'Có lỗi xảy ra khi lấy user_id');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng ký');
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../assets/backround.png')} style={styles.backgroundImage} />
      <View style={styles.overlay}>
        <Text style={styles.title}>Đăng ký</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Ngày sinh (YYYY-MM-DD)"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Nam" value="male" />
          <Picker.Item label="Nữ" value="female" />
          <Picker.Item label="Khác" value="other" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Giới thiệu bản thân"
          value={bio}
          onChangeText={setBio}
        />
         <Picker
          selectedValue={location}
          style={styles.picker}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="Hà Nội" value="HN" />
          <Picker.Item label="Hồ Chí Minh" value="HCM" />
          <Picker.Item label="Đà Nẵng" value="DN" />
          <Picker.Item label="Hải Phòng" value="HP" />
          <Picker.Item label="Cần Thơ" value="CT" />
          <Picker.Item label="An Giang" value="AG" />
          <Picker.Item label="Bà Rịa - Vũng Tàu" value="BRVT" />
          <Picker.Item label="Bắc Giang" value="BG" />
          <Picker.Item label="Bắc Kạn" value="BK" />
          <Picker.Item label="Bạc Liêu" value="BL" />
          <Picker.Item label="Bắc Ninh" value="BN" />
          <Picker.Item label="Bến Tre" value="BT" />
          <Picker.Item label="Bình Dương" value="BD" />
          <Picker.Item label="Bình Định" value="BD" />
          <Picker.Item label="Bình Phước" value="BP" />
          <Picker.Item label="Bình Thuận" value="BT" />
          <Picker.Item label="Cà Mau" value="CM" />
          <Picker.Item label="Cao Bằng" value="CB" />
          <Picker.Item label="Gia Lai" value="GL" />
          <Picker.Item label="Hà Giang" value="HG" />
          <Picker.Item label="Hà Nam" value="HN" />
          <Picker.Item label="Hà Tĩnh" value="HT" />
          <Picker.Item label="Hưng Yên" value="HY" />
          <Picker.Item label="Khánh Hòa" value="KH" />
          <Picker.Item label="Kiên Giang" value="KG" />
          <Picker.Item label="Kon Tum" value="KT" />
          <Picker.Item label="Lai Châu" value="LC" />
          <Picker.Item label="Lâm Đồng" value="LD" />
          <Picker.Item label="Lạng Sơn" value="LS" />
          <Picker.Item label="Lào Cai" value="LC" />
          <Picker.Item label="Long An" value="LA" />
          <Picker.Item label="Nam Định" value="ND" />
          <Picker.Item label="Nghệ An" value="NA" />
          <Picker.Item label="Ninh Bình" value="NB" />
          <Picker.Item label="Ninh Thuận" value="NT" />
          <Picker.Item label="Phú Thọ" value="PT" />
          <Picker.Item label="Phú Yên" value="PY" />
          <Picker.Item label="Quảng Bình" value="QB" />
          <Picker.Item label="Quảng Nam" value="QN" />
          <Picker.Item label="Quảng Ngãi" value="QN" />
          <Picker.Item label="Quảng Trị" value="QT" />
          <Picker.Item label="Sóc Trăng" value="ST" />
          <Picker.Item label="Sơn La" value="SL" />
          <Picker.Item label="Tây Ninh" value="TN" />
          <Picker.Item label="Thái Bình" value="TB" />
          <Picker.Item label="Thái Nguyên" value="TN" />
          <Picker.Item label="Thanh Hóa" value="TH" />
          <Picker.Item label="Thừa Thiên Huế" value="THH" />
          <Picker.Item label="Tiền Giang" value="TG" />
          <Picker.Item label="Trà Vinh" value="TV" />
          <Picker.Item label="Tuyên Quang" value="TQ" />
          <Picker.Item label="Vĩnh Long" value="VL" />
          <Picker.Item label="Vĩnh Phúc" value="VP" />
          <Picker.Item label="Yên Bái" value="YB" />
          <Picker.Item label="Khác" value="other" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  overlay: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền với độ trong suốt
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#B67A62',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});

export default RegisterScreen;
