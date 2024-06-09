import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen({ route }) {

  const { userData } = route.params;
  const user = userData.user;

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [beer, setBeer] = useState(null);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const cameraRef = useRef(null);
  const navigation = useNavigation();

  const tierToPoints = {
    Z: 0,
    D: 5,
    C: 10,
    B: 15,
    A: 20,
    S: 25
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    if (isProcessing) return; // Ignore scans while processing
    setIsProcessing(true); // Set processing flag
    setScannedBarcode({ type, data });
    fetchBeerByBarcode(data).finally(() => setIsProcessing(false)); // Reset flag after fetch completes
  };

  const formatDate = (date) => {
    const padTo2Digits = (num) => num.toString().padStart(2, '0');

    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  };

  const postCollectedBeer = async (beer) => {
    const points = tierToPoints[beer.tier] || 0;
    const collectedBeerData = {
      collected_date: formatDate(new Date()),
      points_awarded: points,
      user_id: user.user_id,
      beer_id: beer.beer_id
    };
    console.log("Formatted Date:", collectedBeerData.collected_date);
    try {
      const response = await fetch('http://192.168.8.113:3000/api/collectedBeers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collectedBeerData)
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          throw new Error(errorData.message || "Failed to record collected beer.");
        } catch (error) {
          throw new Error("Failed to record collected beer and response parsing.");
        }
      }

      const data = JSON.parse(responseText);
      console.log("Collected beer recorded:", data);
    } catch (error) {
      console.error('Error posting collected beer:', error);
      Alert.alert("Error", error.message);
    }
  };

  const fetchBeerByBarcode = async (barcode) => {
    try {
      const response = await fetch(`http://192.168.8.113:3000/api/beer_code/${barcode}`);
      const data = await response.json();
      if (response.ok) {
        setBeer(data);
        postCollectedBeer(data); // Call function to post to backend
        navigation.navigate('Piwodexlist');
        Alert.alert("Złapałeś Piwo!", `Nazwa: ${data.beer_name}\nTier Piwa: ${data.tier}`);
      } else {
        throw new Error('Piwa nie odznaleziono');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      if (error.message === 'Piwa nie odznaleziono') {
        Alert.alert("Piwa nie odznaleziono", "Ten kod kreskowy nie jest piwem w bazie");
      } else {
        Alert.alert("Error", "Failed to fetch beer data.");
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    // Add this debugging statement to check Camera.Constants
    console.log('Camera Constants:', Camera.Constants);
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera
      style={styles.camera}
      type={type}
      ref={cameraRef}
      onBarCodeScanned={handleBarCodeScanned}
    >
      <View style={[styles.horizontalLine, { top: '55%' }]} />
      <View style={styles.buttonContainer}>
        <Button
          title="Obróć Kamerę"
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        />
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  horizontalLine: {
    width: '90%',
    height: 3,
    backgroundColor: '#00F',
  },
});
