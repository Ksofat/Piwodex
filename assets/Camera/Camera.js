import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const cameraRef = useRef(null);

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedBarcode({ type, data });
    alert(`Kod kreskowy typu ${type} o wartości ${data} został zeskanowany!`);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
    <View style={styles.container}>
      <Camera 
       style={[styles.camera]}
       type={type}
       ref={cameraRef}
       onBarCodeScanned={handleBarCodeScanned}
       >
        <View style={[styles.horizontalLine, {top: '55%'}]} />
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
    </View>
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
    aspectRatio: 3/4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  horizontalLine: {
    width: '90%',
    height: 3,
    backgroundColor: '#00F',
  },
});