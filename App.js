import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Login from './Login/Login.js';
import SignUp from './SignUp/SignUp.js';
import Loading from './Loading/Loading.js';
import User from './User/User.js'
import Camera from './assets/Camera/Camera.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();

export default function App() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const LoadingDuration = 3000;
  
  const setTimerComplete = () => setIsLoading(false);

  
  return (
    <NavigationContainer independent={true}>
      
      <Stack.Navigator>
        <Stack.Screen
        name = "LoadingScreen"
        component = {Loading}
        options={{ headerShown: false }}
        initialParams={{ duration: 3000 }}/>
        <Stack.Screen name = "Login" component = {Login} options={{ headerShown: false }}/>
        <Stack.Screen name = "SignUp" component = {SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name = "User" component = {User} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});