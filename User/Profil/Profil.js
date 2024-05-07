import { View ,Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, FlatList, SafeAreaView } from 'react-native'
import Styles from '../../assets/styles/Styles.js'



const dane_przykladowe = [
    { "id": 1, "Name": "Giga Kolekcjoner piw", "Description": "Zbierz 50 unikatowych piw", "Points": 130, "Rank": "S", "Date": "2024-03-12 15:17:35"  },
    { "id": 2, "Name": "Piwosz", "Description": "Uzbieraj łącznie 100 piw", "Points": 80, "Rank": "A", "Date": "2024-04-02 21:37:00" },
    { "id": 3, "Name": "Małpidżony","Description": "Kup swój pierwszy sześciopak", "Points": 30, "Rank": "C", "Date": "2024-02-21 17:11:35"  },
    
];

const renderItem = ({ item }) => (
    <View style={styles.AchievementBox}>
        <Text style={styles.AchievementDate}>
            {item.Date} 
        </Text>
        <View style={styles.DetailRow}>
            <View style={styles.Content}>
                <Text style={styles.AchievementName}>
                    {`${item.Name} (${item.Points})`}
                </Text>
                <Text style={styles.AchievementDescription}>
                    {item.Description}
                </Text>
            </View>
            <Text style={styles.AchievementRank}>
                {item.Rank}
            </Text>
        </View>
    </View>
);


export default function ProfilScreen(){
return (
    <SafeAreaView style = {Styles.background}>
        <View style = {[styles.User]}>
            <Text style = {styles.UserText}>Imię: Ksofar</Text>
            <Text style = {styles.UserText}>Email: Ksofar2137@gmail.com</Text>
        </View>
        <Text style = {styles.AchievementsLineText}>Osiągnięcia</Text>
        <View style={[styles.horizontalLine]} />
        <FlatList
                data={dane_przykladowe}
                keyExtractor={(item) =>  item.id.toString()}
                renderItem={renderItem}
            />
    </SafeAreaView>
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
    fontSize: 25,
    marginTop: 10,
    textAlign: 'right',
},

AchievementName: {
    fontSize: 20,

},

AchievementDate: {
    fontSize: 10,

},

AchievementRank: {
    fontSize: 40,
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