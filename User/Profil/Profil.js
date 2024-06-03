import React, { useState, useEffect } from 'react';
import { View ,Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, FlatList, SafeAreaView } from 'react-native'


export default function ProfilScreen({ route }) {
    const { userData } = route.params;
    const user = userData.user;

    const [achievementsData, setAchievementsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAchievementsData();
    }, []);

    const fetchAchievementsData = async () => {
        setIsLoading(true);
        try {
            const userAchievementsResponse = await fetch('http://192.168.8.112:3000/api/userAchievements');
            const userAchievements = await userAchievementsResponse.json();
    
            const achievementsResponse = await fetch('http://192.168.8.112:3000/api/achievements');
            const achievements = await achievementsResponse.json();
    
            // Filter userAchievements by user_id
            const filteredUserAchievements = userAchievements.filter(ua => ua.user_id === user.user_id);
    
            // Merge filtered user achievements with the achievements details
            const mergedData = filteredUserAchievements.map(ua => ({
                ...ua,
                ...achievements.find(a => a.AchievementID === ua.AchievementID)
            }));
    
            setAchievementsData(mergedData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <SafeAreaView style={styles.background}><Text>Loading achievements...</Text></SafeAreaView>;
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.User}>
                <Text style={styles.UserText}>Imię: {user.nickname}</Text>
                <Text style={styles.UserText}>Email: {user.email}</Text>
                <Text style={styles.UserText}>Punkty: {user.pointssum || 0}</Text>
            </View>
            <Text style={styles.AchievementsLineText}>Osiągnięcia</Text>
            <View style={styles.horizontalLine} />
            <FlatList
                data={achievementsData}
                keyExtractor={(item) => item.user_achievement_id.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
}

const renderItem = ({ item }) => {

    const formattedDate = item.achived_date.split('T')[0];
    var formattedHour = item.achived_date.split('T')[1];
    formattedHour = formattedHour.split('.')[0];
    console.log('Rendering item:', item);  // Check if and what is being rendered
    return (
    
    <View style={styles.AchievementBox}>
        <Text style={styles.AchievementDate}>
            {formattedDate}: {formattedHour}
        </Text>
        <View style={styles.DetailRow}>
            <Text style={styles.AchievementName}>
                {item.description} 
            </Text>
            <Text style={styles.AchievementRank}>
                {item.tier_required}
            </Text>
        </View>
    </View>
)
};

const styles = StyleSheet.create({

User: {
    backgroundColor: '#1cc1fd',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    marginTop: 15,

},


UserText: {
fontSize: 20,
},

AchievementsLineText: {
    fontSize: 30,
    marginTop: 10,
    textAlign: 'right',
},

AchievementName: {
    fontSize: 30,

},

AchievementDate: {
    fontSize: 10,

},

AchievementRank: {
    fontSize: 45,
    textAlign: 'right',
    color: '#08d141'

},

horizontalLine: {
    width: '100%',
    height: 10,
    backgroundColor: '#000000',
  },

AchievementBox: {
    backgroundColor: '#1cc1fd',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    marginTop: 15,

},

DetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
}

});