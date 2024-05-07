import { View ,Text, Image, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, FlatList, SafeAreaView } from 'react-native'
import Styles from '../../assets/styles/Styles.js'
import Biedraka from '../../assets/images/Biedraka.png'
import React, { useState } from 'react';


export default function DyskusjeScreen(){

    const { width } = useWindowDimensions();
    const [showMessage1, setShowMessage1] = useState(false);

    
    const toggleMessage = (index) => {
        if (index === 1) setShowMessage1(!showMessage1);
    };

return (
<View style = {[Styles.root]}>
    <TouchableOpacity onPress={() => toggleMessage(1)} style={styles.ShopBox}>  
        <Image source={Biedraka} style = {[{width: width * 0.8}, {height: width * 0.4}]} resizeMode = "contain"/>
        <Text style = {styles.ShopLocation}>Ul. Jakaśtam 14</Text>
        {showMessage1 && (
            <>
            <View style = {styles.MainSeparator}/>
            <View style = {styles.User}>
                <Text style = {styles.UserName}>Pjoter:</Text>
                <Text style = {styles.PostDate}>31.02.2026r</Text>
            </View>
            <Text style = {styles.Comment}>Fajny sklepik byczqu</Text>
            <View style = {styles.Separator}/>

            <View style = {styles.User}>
                <Text style = {styles.UserName}>Jurek:</Text>
                <Text style = {styles.PostDate}>11.5.2023r</Text>
            </View>
            <Text style = {styles.Comment}>Same siarczany tu mają!</Text>
            <View style = {styles.Separator}/>
            </>
        )}
    </TouchableOpacity>
        <View style = {[styles.ShopBox]}>
    <Image source={Biedraka} style = {[{width: width * 0.8}, {height: width * 0.4}]} resizeMode = "contain"/>
    <Text style = {styles.ShopLocation}>Inny Adres</Text>
        </View>
        <View style = {[styles.ShopBox]}>
    <Image source={Biedraka} style = {[{width: width * 0.8}, {height: width * 0.4}]} resizeMode = "contain"/>
    <Text style = {styles.ShopLocation}>Też Inny</Text>
        </View>
</View>
)
};

const styles = StyleSheet.create({
ShopBox: {
    borderColor: '#ffffff',
    borderWidth: 4,
    backgroundColor: "#83DCFE",
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
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
User: {
    flexDirection: 'row',
    justifyContent: 'space-between',

},

UserName: {
    fontSize: 20,
    textAlign: 'left',

},
PostDate: {
    fontSize: 12,
    textAlign: 'right',
},
Comment: {
    fontSize: 15,
    textAlign: 'left',

}

})