    import { View ,Text, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, FlatList, SafeAreaView } from 'react-native'
    import Styles from '../../assets/styles/Styles.js'

    const dane_przykladowe = [
        { "id": 23, "rank": 1, "Nickname": "Przemo", "Points": 2137 },
        { "id": 12, "rank": 2, "Nickname": "Ktos", "Points": 2100 },
        { "id": 65, "rank": 3, "Nickname": "Ktos_Inny", "Points": 2000 },
        
    ];



    export default function RankingScreen(){
        const { width } = useWindowDimensions();

        const renderItem = ({ item }) => (
            <View style = {[styles.row, { width: width - 32 }]}>
                <Text style={[styles.cell, styles.borderedCell, { textAlign: "left", flex: 2, marginLeft: 5}]}>
                {`${item.rank}. ${item.Nickname}`}
                </Text>
                <Text style={[styles.cell, {flex: 1}]}>{item.Points}</Text>
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
                data={dane_przykladowe}
                keyExtractor={(item) =>  item.id.toString()}
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