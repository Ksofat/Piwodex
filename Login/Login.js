import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, useWindowDimensions, SafeAreaView, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Styles from '../assets/styles/Styles.js';
import Logo from '../assets/images/Logo.png';

const LoginText = ({ Value, onChangeText, Placeholder, InitialSecure }) => {
    const [isSecure, setIsSecure] = useState(InitialSecure);
    return (
        <View style={Styles.LoginBox}>
            <TextInput
                placeholder={Placeholder}
                value={Value}
                onChangeText={onChangeText}
                style={Styles.LoginText}
                secureTextEntry={isSecure}
            />
        </View>
    );
};

export default function LoginScreen() {
    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const [Email, setEmail] = useState('');
    const [Haslo, setHaslo] = useState('');

    const handleLoginPress = async () => {
        try {
            const response = await fetch('http://192.168.8.112:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: Email, // Ensure this matches the server-side key
                    password: Haslo, // Ensure this matches the server-side key
                }),
            });
    
            // Log the status, headers, and raw response for debugging
            const rawResponse = await response.text();
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            console.log('Raw response:', rawResponse);
    
            // Try to parse JSON
            let json;
            try {
                json = JSON.parse(rawResponse);
            } catch (error) {
                console.error('Failed to parse JSON:', error);
                throw new Error(`Failed to parse JSON: ${error.message}`);
            }
    
            if (response.status === 200) {
                // Here you might want to save the token or other authentication details
                // For example, using AsyncStorage or Context API
                // AsyncStorage.setItem('userToken', json.token);
                console.log('Login successful:', json);
                navigation.navigate('User', { userData: json }); // Navigate to the User screen or other target
            } else {
                Alert.alert("Login Error", json.message || "Failed to log in");
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert("Login Error", error.message || "An error occurred during login.");
        }
    };

    return (
        <SafeAreaView style={Styles.background}>
            <View style={Styles.root}>
                <Image source={Logo} style={[{ height: height * 0.4 }, { marginTop: height * 0.05 }]} resizeMode="contain" />
                <LoginText
                    Placeholder="Email"
                    Value={Email}
                    onChangeText={setEmail}
                    InitialSecure={false}
                />
                <LoginText
                    Placeholder="Hasło"
                    Value={Haslo}
                    onChangeText={setHaslo}
                    InitialSecure={true}
                />
                <TouchableOpacity style={Styles.LoginButton} onPress={handleLoginPress}>
                    <Text style={Styles.LoginButton_Text}>
                        Zaloguj się
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.LoginButton} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={Styles.LoginButton_Text}>
                        Utwórz Konto
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}