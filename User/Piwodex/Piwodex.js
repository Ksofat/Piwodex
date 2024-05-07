import { View ,Text, StyleSheet, Image, TextInput, TouchableOpacity, useWindowDimensions, FlatList, SafeAreaView, ScrollView } from 'react-native'
import Styles from '../../assets/styles/Styles.js'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Harnas from '../../assets/images/Harnas.png'



export default function PiwodexScreen(){

const navigation = useNavigation();

const { width } = useWindowDimensions();

const handleButtonPress = () => {
    navigation.navigate('Camera');
};

return (
    <View style = {[Styles.root]}>
    <ScrollView>
    <View style={styles.BeerRow}>
        <View style={[styles.GoldSquare, { width: width * 0.3, height: width * 0.3 }]}>
        <Image source={Harnas} style = {[{width: width * 0.3}, {height: width * 0.3}]} resizeMode = "contain"/>
        </View>
        <View style={[styles.GoldSquare, { width: width * 0.3, height: width * 0.3 }]} />
        <View style={[styles.GoldSquare, { width: width * 0.3, height: width * 0.3 }]} />
    </View>
        <View style={styles.BeerRow}>
        <View style={[styles.SilverSquare, { width: width * 0.3, height: width * 0.3 }]} />
        <View style={[styles.SilverSquare, { width: width * 0.3, height: width * 0.3 }]} />
        <View style={[styles.SilverSquare, { width: width * 0.3, height: width * 0.3 }]} />
    </View>
    <View style={styles.BeerRow}>
        <View style={[styles.BronzeSquare, { width: width * 0.3, height: width * 0.3 }]} />
        <View style={[styles.BronzeSquare, { width: width * 0.3, height: width * 0.3 }]} />
        <View style={[styles.BronzeSquare, { width: width * 0.3, height: width * 0.3 }]} />
    </View>
    </ScrollView>
    <TouchableOpacity style={Styles.LoginButton} onPress={handleButtonPress}>
                <Text style={Styles.LoginButton_Text}>Złap Piwo!</Text>
    </TouchableOpacity>
    </View>


)
};

const styles = StyleSheet.create({

BeerRow: {
    flexDirection: 'row',


},


GoldSquare: {

    backgroundColor: '#FFD700',
    borderRadius: 5,
    borderWidth: 4,
    borderColor: '#E2C426',
    marginLeft: 5,
    marginTop: 10,
},

SilverSquare: {
    backgroundColor: '#DFD9D9',
    borderRadius: 5,
    borderWidth: 4,
    borderColor: '#A7A6A6',
    marginLeft: 5,
    marginTop: 10,

},

BronzeSquare: {

    backgroundColor: '#E6460C',
    borderRadius: 5,
    borderWidth: 4,
    borderColor: '#AD3307',
    marginLeft: 5,
    marginTop: 10,


},
CameraButton: {


},

CameraButtonText: {


}


})
