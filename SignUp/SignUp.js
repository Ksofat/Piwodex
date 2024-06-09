import { View, Text, TextInput, TouchableOpacity, useWindowDimensions, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Styles from '../assets/styles/Styles.js';


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

const validatePassword = (password) => {
    if (password.length < 8) {
        return "Hasło musi zawierać co najmniej 8 znaków.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Hasło musi zawierać co najmniej jedną dużą literę.";
    }
    if (!/[0-9]/.test(password)) {
        return "Hasło musi zawierać co najmniej jedną cyfrę.";
    }
    return null;
};

const handleRegisterPress = async () => {
    // Validate inputs as needed
    if (Haslo !== HasloAgain) {
        Alert.alert("Błąd rejestracji", "Hasła nie są identyczne.");
        return;
    }

    const passwordError = validatePassword(Haslo);
    if (passwordError) {
        Alert.alert("Błąd rejestracji", passwordError);
        return;
    }
    
    // Send data to the server
    try {
        const response = await fetch('http://192.168.137.1:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: Nick,
                email: Email,
                password: Haslo,
                userType: 'null' // Assuming 'userType' needs to be sent; adjust as per your model
            }),
        });

        const jsonResponse = await response.json();

        if (response.status === 201) {
            Alert.alert("Rejestracja udana", "Konto zostało pomyślnie utworzone.");
            navigation.navigate('Login'); // Assuming you want to redirect the user to login screen
        } else {
            // Handle server errors (e.g., email already used)
            Alert.alert("Błąd rejestracji", jsonResponse.message || "Nie można utworzyć konta.");
        }
    } catch (error) {
        console.error('Register Error:', error);
        Alert.alert("Błąd rejestracji", "Problem z połączeniem serwera.");
    }
};

export default function SignUpScreen() {

const { height } = useWindowDimensions();
const navigation = useNavigation();

const [Nick, setNick] = useState('');
const [Email, setEmail] = useState('');
const [Haslo, setHaslo] = useState('');
const [HasloAgain, setHasloAgain] = useState('');

const handleRegisterPress = async () => {
    // Validate inputs as needed
    if (Haslo !== HasloAgain) {
        Alert.alert("Błąd rejestracji", "Hasła nie są identyczne.");
        return;
    }

    const passwordError = validatePassword(Haslo);
    if (passwordError) {
        Alert.alert("Błąd rejestracji", passwordError);
        return;
    }
    
    // Send data to the server
    try {
        const response = await fetch('http://192.168.43.46:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname: Nick,
                email: Email,
                password: Haslo,
                userType: 'null' // Assuming 'userType' needs to be sent; adjust as per your model
            }),
        });

        const jsonResponse = await response.json();

        if (response.status === 201) {
            Alert.alert("Rejestracja udana", "Konto zostało pomyślnie utworzone.");
            navigation.navigate('Login'); // Assuming you want to redirect the user to login screen
        } else {
            // Handle server errors (e.g., email already used)
            Alert.alert("Błąd rejestracji", jsonResponse.message || "Nie można utworzyć konta.");
        }
    } catch (error) {
        console.error('Register Error:', error);
        Alert.alert("Błąd rejestracji", "Problem z połączeniem serwera.");
    }
};

return (
<SafeAreaView style={Styles.background}>
    <View style={[Styles.root, { paddingTop: height * 0.2 }]}>
        <LoginText
            Placeholder="Pseudonim"
            Value={Nick}
            onChangeText={setNick}
            InitialSecure={false}
        />
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
        <LoginText
            Placeholder="Powtórz Hasło"
            Value={HasloAgain}
            onChangeText={setHasloAgain}
            InitialSecure={true}
        />
        <TouchableOpacity style={Styles.LoginButton} onPress={handleRegisterPress}>
            <Text style={Styles.LoginButton_Text}>
                Zarejestruj Się!
            </Text>
        </TouchableOpacity>                
    </View>

</SafeAreaView>
)

}