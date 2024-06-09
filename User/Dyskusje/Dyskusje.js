    import { Modal, TextInput, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Alert } from 'react-native';
    import Styles from '../../assets/styles/Styles.js';
    import Zabka from '../../assets/images/Zabka.png';
    import Biedronka from '../../assets/images/Biedraka.png';
    import React, { useState, useEffect } from 'react';
    import * as Location from 'expo-location';

    export default function DyskusjeScreen({ route }) {

        const { userData } = route.params;
        const user = userData.user;
        
        const { width } = useWindowDimensions();
        const [discussions, setDiscussions] = useState([]);
        const [selectedStoreId, setSelectedStoreId] = useState(null);
        const [shops, setShops] = useState([]);
        const [modalVisible, setModalVisible] = useState(false);
        const [commentText, setCommentText] = useState('');

        useEffect(() => {
            fetchShopsWithDiscussions();
        }, []);

        const fetchShopsWithDiscussions = async () => {
            try {
                const response = await fetch('http://192.168.8.113:3000/api/discussions-earliest-by-store');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const text = await response.text();
                const data = JSON.parse(text);
                console.log("Shops data:", data);
                setShops(data);
            } catch (error) {
                console.error('Failed to fetch shops:', error);
            }
        };

        const fetchUserName = async (userId) => {
            try {
                const response = await fetch(`http://192.168.8.113:3000/api/users/${userId}`);
                const userData = await response.json();
                return userData.nickname;
            } catch (error) {
                console.error('Error fetching user:', error);
                return null;
            }
        };

        const fetchDiscussionsForStore = async (store_id) => {
            try {
                const response = await fetch(`http://192.168.8.113:3000/api/discussions/store/${store_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch discussions');
                }
                let data = await response.json();
        
                const discussionsWithUsernames = await Promise.all(data.map(async (discussion) => {
                    const userName = await fetchUserName(discussion.user_id);
                    return {...discussion, user_name: userName || 'Unknown User'};
                }));
        
                setDiscussions(discussionsWithUsernames);
            } catch (error) {
                console.error('Error fetching discussions:', error);
            }
        };

        const submitComment = async () => {
            // Create the message payload
            const messageData = {
                message: commentText,
                modified_date: new Date(),  // This can also be handled server-side
                user_id: user.user_id,  // Assuming 'user' object has 'id' property
                store_id: selectedStoreId,
            };
        
            try {
                const response = await fetch('http://192.168.8.113:3000/api/discussions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageData)
                });
        
                if (!response.ok) {
                    throw new Error('Failed to submit comment');
                }
        
                const responseData = await response.json();
        
                // Optionally update the UI to show the new comment
                setDiscussions([...discussions, {...responseData, user_name: user.nickname}]);
                setCommentText('');  // Clear the input field
                setModalVisible(false);  // Close the modal
        
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        };

        const getImageSource = (storeName) => {
            switch (storeName) {
                case 'Biedronka': return Biedronka;
                case 'Zabka': return Zabka;
                default: return Biedronka;
            }
        };

        const toggleShowDiscussions = (store_id) => {
            if (selectedStoreId === store_id) {
                setSelectedStoreId(null);
                setDiscussions([]);
            } else {
                setSelectedStoreId(store_id);
                fetchDiscussionsForStore(store_id);
            }
        };

        const isUserInStore = (userLat, userLon, storeLat, storeLon, margin = 0.00018) => {
            const latMin = storeLat - margin;
            const latMax = storeLat + margin;
            const lonMin = storeLon - margin;
            const lonMax = storeLon + margin;
        
            return userLat >= latMin && userLat <= latMax && userLon >= lonMin && userLon <= lonMax;
        };

        const checkIfUserIsInAnyStore = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const userLat = location.coords.latitude;
            const userLon = location.coords.longitude;

            console.log("User's Location:", userLat, userLon);

            let isUserInAnyStore = false;

            for (const shop of shops) {
                console.log("Checking store:", shop.store_name, "at location:", shop.location_x, shop.location_y); // Log each shop's location
                if (isUserInStore(userLat, userLon, parseFloat(shop.location_x), parseFloat(shop.location_y))) {
                    logVisit(shop.store_id, user.user_id, shop.store_name);
                    isUserInAnyStore = true;
                    break;
                }
            };
            if (!isUserInAnyStore) {
                Alert.alert("Oops", `Nie znajdujesz się w żadnym sklepie`)
            }
        };
        
        const logVisit = async (storeId, userId, storeName) => {
            try {
                const response = await fetch('http://192.168.8.113:3000/api/visited', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        visited: true,
                        user_id: userId,
                        store_id: storeId
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to log visit');
                }
                const responseData = await response.json();
                Alert.alert("Wizyta Zapisana", `Zostałeś zapisany jako gość sklepu: ${storeName}`);
            } catch (error) {
                console.error('Error logging visit:', error);
                Alert.alert("Error", error.message);
            }
        };

        return (
            <ScrollView style={[styles.Dyskusje_root]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.textInputStyle}
                                onChangeText={setCommentText}
                                value={commentText}
                                placeholder="Napisz Ocenę Sklepu..."
                                multiline={true} // Enable multi-line input
                                numberOfLines={3}
                            />
                            <TouchableOpacity
                                style={styles.buttonClose}
                                onPress={() => {
                                    submitComment();
                                    setModalVisible(!modalVisible);
                                    // Optionally, handle the comment submission here
                                }}
                            >
                                <Text style={styles.textStyle}>Wyślij Komentarz!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {shops.map((shop) => (
                    <TouchableOpacity key={shop.store_id} onPress={() => toggleShowDiscussions(shop.store_id)} style={styles.ShopBox}>
                        <View style={[styles.ImageContainer, { width: width * 0.8, height: width * 0.4 }]}>
                            <Image
                                source={getImageSource(shop.store_name)}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.ShopLocation}>{shop.store_name || 'Unknown Shop'}</Text>
                        {selectedStoreId === shop.store_id && (
                            <View>
                                <View style={styles.MainSeparator} />
                                {discussions.map((discussion, index) => (
                                    <View key={index}>
                                        <View style={styles.DiscussionBox}>
                                            <Text style={styles.UserName}>{discussion.user_name}</Text>
                                            <Text style={styles.DiscussionText}>{discussion.message}</Text>
                                            <Text style={styles.DiscussionDate}>{new Date(discussion.modified_date).toLocaleDateString()}</Text>
                                        </View>
                                        {index < discussions.length - 1 && <View style={styles.Separator} />}
                                    </View>
                                ))}
                                <TouchableOpacity
                                    onPress={() => setModalVisible(true)}
                                    style={styles.AddCommentButton}>
                                    <Text style={styles.AddCommentButtonText}>Dodaj Komentarz!</Text>
                                </TouchableOpacity>
                                <Text style={styles.Comment}>{shop.message}</Text>
                                <View style={styles.Separator} />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    onPress={checkIfUserIsInAnyStore}
                    style={styles.locationButton}>
                    <Text style={styles.locationButtonText}>Pobierz Lokację!</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

const styles = StyleSheet.create({
    ShopBox: {
        borderColor: '#ffffff',
        borderWidth: 4,
        backgroundColor: "#83DCFE",
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center', // Center children vertically
        overflow: 'hidden',
    },
    ImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    ShopLocation: {
        fontSize: 15,
        textAlign: 'center',
    },
    MainSeparator: {
        height: 6,
        backgroundColor: '#000000',
    },
    Separator: {
        height: 3,
        backgroundColor: '#000000',
    },
    DiscussionBox: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    UserName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    DiscussionText: {
        fontSize: 14,
    },
    DiscussionDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
    Comment: {
        fontSize: 15,
        textAlign: 'left',
        padding: 5,
    },
    Dyskusje_root: {    
        padding: 10,
        backgroundColor: '#0278A4',
        flex: 1,
    },

    AddCommentButton: {
        backgroundColor: "#4CAF50",  // Green background for visibility
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    AddCommentButtonText: {
        color: '#ffffff',  // White text color for contrast
        fontSize: 16,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        width: '80%', // Adjust the modal width if necessary
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textInputStyle: {
        height: 120, // Increased height for multiline input
        width: '100%', // Set a specific width
        alignSelf: 'center', // Center the TextInput within its container
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 16, // Optional: Increase font size for better readability
        textAlignVertical: 'top', // Ensure text starts from the top
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    locationButton: {
        backgroundColor: "#4CAF50",  // Green background for visibility
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    locationButtonText: {
        color: '#ffffff',  // White text color for contrast
        fontSize: 16,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});