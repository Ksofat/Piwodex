import { View ,Text, Image, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, SafeAreaView, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import React, { useState, useEffect } from 'react';



export default function MapyScreen({ route }){

  const { userData } = route.params;
  const user = userData.user;

  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.8.113:3000/api/stores/visited/${user.user_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
          console.log('Stores data:', data); // Check the console for actual data received
          setStores(data);
        })

        .catch(error => {
            console.error('Failed to fetch stores', error);
            Alert.alert('Error', 'Failed to fetch stores: ' + error.message);
        });
}, [user.user_id]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.1078852,
          longitude: 17.0385376,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {stores.map((store) => (
          <Marker
          key={store.store_id}
          coordinate={{ latitude: parseFloat(store.location_x), longitude: parseFloat(store.location_y) }}
          pinColor={store.visited ? 'green' : 'red'} // green if visited, red otherwise
          title={store.store_name}
          description={store.visited ? 'Visited' : 'Not Visited'}
          />
        ))}
      </MapView>
    </View>
  );
}

    const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        map: {
          width: '100%',
          height: '100%',
        },
      });