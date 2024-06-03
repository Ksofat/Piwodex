import { View ,Text, StyleSheet, Image, TextInput, TouchableOpacity, useWindowDimensions, FlatList, SafeAreaView, ScrollView } from 'react-native'
import Styles from '../../assets/styles/Styles.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Harnas from '../../assets/images/Harnas.png'
import React, { useState, useEffect, useRef } from 'react';



export default function PiwodexScreen( {route} ){

    const { userData } = route.params;   
    const user = userData.user;

    const navigation = useNavigation();

    const { width } = useWindowDimensions();

    const [collectedBeers, setCollectedBeers] = useState([]);

    useEffect(() => {
        fetchCollectedBeers(user.user_id);
    }, [user.user_id]);

    const fetchBeerDetails = async (beerId) => {
        console.log("Fetching details for beer ID:", beerId);  // Log the beer ID
        try {
            const response = await fetch(`http://192.168.8.112:3000/api/beers_all/${beerId}`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Failed to fetch beer details: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching beer details:', error);
            return null;
        }
    };
    
    const fetchCollectedBeers = async (userId) => {
        try {
            const response = await fetch(`http://192.168.8.112:3000/api/collectedBeers/user/${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched collected beers for user ID:", userId, data);
                const beersWithDetails = await Promise.all(data.map(beer => fetchBeerDetails(beer.beer_id)));
                setCollectedBeers(beersWithDetails);
            } else {
                throw new Error(data.message || "Unable to fetch data");
            }
        } catch (error) {
            console.error('Error fetching collected beers:', error.message);
            // Handle errors here, e.g., show a notification
        }
    };

    const handleButtonPress = () => {
        navigation.navigate('Camera');
    };

    const renderBeer = (beer) => {
        let tierStyle;
            switch(beer.tier) {
                case 'S':
                    tierStyle = styles.TierS;
                    break;
                case 'A':
                    tierStyle = styles.TierA;
                    break;
                case 'B':
                    tierStyle = styles.TierB;
                    break;
                case 'C':
                    tierStyle = styles.TierC;
                    break;
                case 'D':
                    tierStyle = styles.TierD;
                    break;
                case 'Z':
                    tierStyle = styles.TierZ;
                    break;
                default:
                    tierStyle = {};  // Fallback style or an error handling can be added here
            }
        return (
            <View key={beer.beer_id.toString()} style={[styles.BeerSquare, tierStyle, { width: width * 0.3, height: width * 0.3 }]}>
                <Image source={{ uri: beer.beer_image }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
        );
    };
    
    return (
        <View style={Styles.root}>
            <ScrollView>
                {collectedBeers.map(beer => renderBeer(beer))}
            </ScrollView>
            <TouchableOpacity style={Styles.LoginButton} onPress={handleButtonPress}>
                <Text style={Styles.LoginButton_Text}>Złap Piwo!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

BeerRow: {
    flexDirection: 'row',


},


BeerSquare: {
    width: '30%',
    height: 120,  // Adjust dimensions as needed
    borderRadius: 5,
    borderWidth: 4,
    marginLeft: 5,
    marginTop: 10,
},

TierZ: {// 
    backgroundColor: '#cccccc', 
    borderColor: '#bbbbbb',
},

TierD: {
    backgroundColor: '#00ff00', 
    borderColor: '#00e600',
},

TierC: {
    backgroundColor: '#cd7f32',  
    borderColor: '#ad6f29',
},

TierB: {
    backgroundColor: '#C0C0C0', 
    borderColor: '#A7A6A6',
},

TierA: {
    backgroundColor: '#FFD700',  
    borderColor: '#E2C426',
},
TierS: {
    backgroundColor: '#0000ff', 
    borderColor: '#0000e6',
},

CameraButton: {


},

CameraButtonText: {


}


})
