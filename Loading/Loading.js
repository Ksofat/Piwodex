
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import Styles from '../assets/styles/Styles.js';

const LoadingScreen = ({ route, navigation }) => {
    const { duration } = route.params;
    const [progress, setProgress ] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {     
            startTimer();                                   // nasłuchiwacz, odpala timer jak okno jest skupione
        });

        return unsubscribe;
    }, [navigation]);

    const startTimer = () => {
        const startTime = Date.now();
        const interval = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          setProgress(elapsedTime / duration);      //wartosc od 0 do 1
          if (elapsedTime >= duration) {
            clearInterval(interval);
            navigation.replace('Login');
          }
        }, 50);  // Update every 50xms

        return () => clearInterval(interval);
};

return (
    <View style={Styles.LoadingCircle}> 
      <Progress.Circle size = {300} progress={progress} showsText = {true}/>
    </View>
  );
};
export default LoadingScreen;