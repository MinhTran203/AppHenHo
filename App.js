import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Đường dẫn đến file HomeScreen
import AddPicture from './screens/AddPicture'; // Đường dẫn đến file AddPicture
import SettingsScreen from './screens/SettingsScreen'; // Đổi đường dẫn nếu cần
import MainPage from './screens/MainPage'; // Đổi đường dẫn nếu cần
import DangNhap from './screens/DangNhap'; // Đổi đường dẫn nếu cần
import Dangky from './screens/DangKy'; // Đổi đường dẫn nếu cần


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Settings"
        screenOptions={{ headerShown: false }} // Ẩn header cho tất cả các màn hình
      >
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPicture" component={AddPicture} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="DangNhap" component={DangNhap} />
        <Stack.Screen name="DangKy" component={Dangky} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
