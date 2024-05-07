import React, { useState, useEffect } from 'react';
import { View ,Text, Image, TextInput, TouchableOpacity, useWindowDimensions, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Cookies from 'js-cookie';
import Styles from '../assets/styles/Styles.js'
import Logo from '../assets/images/Logo.png'

 
const LoginText = ({Value, onChangeText, Placeholder, InitialSecure}) => {

    const [isSecure, setIsSecure] = useState(InitialSecure);


    return(
        <View style = {Styles.LoginBox}>
            <TextInput
            placeholder = {Placeholder} 
            value = {Value}
            onChangeText = {onChangeText} 
            style = {Styles.LoginText}
            secureTextEntry = {isSecure} 
            />
        </View>
    )
}


export default function LoginScreen(){

const {height} = useWindowDimensions();
const navigation = useNavigation();

const[Email, setEmail] = useState('');
const[Haslo, setHaslo] = useState('');

const handleLoginPress = () => {
    navigation.navigate('User');
};


return (

    <SafeAreaView style = {Styles.background}>
        <View style = {Styles.root}>
        <Image source={Logo} style = {[{height: height * 0.4}, {marginTop: height * 0.05}]} resizeMode = "contain"/>
            <LoginText
                Placeholder = "Email"
                Value = {Email}
                onChangeText={setEmail}
                InitialSecure={false}
            />

            <LoginText
                Placeholder = "Hasło"
                Value = {Haslo}
                onChangeText={(text) => setHaslo(text)}
                InitialSecure={true}
            />

            <TouchableOpacity style={Styles.LoginButton} onPress={handleLoginPress}>
                <Text style={Styles.LoginButton_Text} >
                Zaloguj się
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={Styles.LoginButton}>
                <Text style={Styles.LoginButton_Text} >
                Utwórz Konto
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
)
}

