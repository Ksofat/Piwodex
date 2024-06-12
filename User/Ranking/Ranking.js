import React, { useState, useEffect } from 'react';
import { View ,Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, FlatList, SafeAreaView } from 'react-native'
import Styles from '../../assets/styles/Styles.js'

const dane_przykladowe = [
    { "id": 23, "rank": 1, "Nickname": "Przemo", "Points": 2137 },
    { "id": 12, "rank": 2, "Nickname": "Ktos", "Points": 2100 },
    { "id": 65, "rank": 3, "Nickname": "Ktos_Inny", "Points": 2000 },
    
];



export default function RankingScreen(){
    const { width } = useWindowDimensions();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://pajace.azurewebsites.net/api/users')
        .then(response => {
            console.log(response); // Log the response object
            return response.text(); // Use text() to see what is actually being returned
        })
        .then(text => {
            console.log(text); // Log the response text
            return JSON.parse(text); // Parse it as JSON after checking the logs
        })
        .then(data => {
            // Sort users by points in descending order
            const usersWithPoints = data.filter(user => user.pointssum > 0);
            const sortedUsers = usersWithPoints.sort((a, b) => b.pointssum - a.pointssum);
            // Assign rank based on position in sorted array
            const usersWithRank = sortedUsers.map((user, index) => ({
                ...user,
                rank: index + 1
            }));
            setUsers(usersWithRank);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const renderItem = ({ item }) => (
        <View style = {[styles.row, { width: width - 32 }]}>
            <Text style={[styles.cell, styles.borderedCell, { textAlign: "left", flex: 2, marginLeft: 5}]}>
            {`${item.rank}. ${item.nickname}`}
            </Text>
            <Text style={[styles.cell, {flex: 1}]}>{item.pointssum}</Text>
        </View>


    )


return (
    <SafeAreaView style = {Styles.background}>
        <View style = {[Styles.root]}>
        <View style = {[styles.header]}>
            <Text style = {[styles.heading, {textAlign: 'left', paddingLeft: 40,}]}>Ranga</Text>
            <Text style = {[styles.heading, {textAlign: 'center', paddingLeft: 90,}]}>Punkty</Text>
        </View>
        <FlatList
            data={users}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={renderItem}
        />
        </View>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        elevation: 1,
        borderRadius: 5,
        backgroundColor: "#83DCFE",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        alignItems: 'center',

    },
    cell: {
        fontSize: 20,
        backgroundColor: "#83DCFE",
        justifyContent: 'center',
        paddingVertical: 30,
        textAlign: 'center',
    },
    borderedCell: {
        borderRightColor: "#FFFFFF",
        borderRightWidth: 1,
        
    },

    header: {
        flexDirection: 'row',
        backgroundColor: '#1cc1fd',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 30,
        borderColor: "#FFFFFF",
        borderWidth: 4,
        
    },

    heading: {
        fontSize: 25,
        paddingLeft: 80,
        
    },

})