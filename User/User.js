import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View ,Text, Image, TextInput, TouchableOpacity, useWindowDimensions, SafeAreaView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Piwodex from './Piwodex/Piwodex.js'
import Mapy from './Mapy/Mapy.js'
import Dyskusje from './Dyskusje/Dyskusje.js'
import Profil from './Profil/Profil.js'
import Ranking from './Ranking/Ranking.js'
import Camera from '../assets/Camera/Camera.js'; 

const Tab = createBottomTabNavigator();

const PiwodexStack = createNativeStackNavigator();

function PiwodexStackNavigator({ route }) {
    const { userData } = route.params;    
    return (
      <PiwodexStack.Navigator>
        <PiwodexStack.Screen name="Piwodexlist" component={Piwodex} options={{ headerShown: false }} initialParams={{ userData: userData }}/>
        <PiwodexStack.Screen name="Camera" component={Camera} options={{ headerShown: false }} initialParams={{ userData: userData }}/>
      </PiwodexStack.Navigator>
    );
  }


export default function UserScreen( {route} ){

const { userData } = route.params;    

return (
    <NavigationContainer independent={true}>
        <Tab.Navigator
        initialRouteName="Mapy"
        screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let routename = route.name;

                if (routename === "Mapy") {
                    iconName = focused ? 'location' : 'location-outline'
                } else if (routename === "Dyskusje") {
                    iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline'
                } else if (routename === "Piwodex") {
                    iconName = focused ? 'flask' : 'flask-outline'
                } else if (routename === "Profil") {
                    iconName = focused ? 'accessibility' : 'accessibility-outline'
                } else if (routename === "Ranking") {
                    iconName = focused ? 'trophy' : 'trophy-outline'
                }

                return <Ionicons name={iconName} size={size} color={color}/>

            },
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#1cc1fd'
            }
        })}>

        <Tab.Screen name="Mapy" component = {Mapy} initialParams={{ userData }}/>
        <Tab.Screen name="Piwodex" component = {PiwodexStackNavigator} initialParams={{ userData }}/>
        <Tab.Screen name="Dyskusje" component = {Dyskusje} initialParams={{ userData }}/>
        <Tab.Screen name="Profil" component = {Profil} initialParams={{ userData }}/>
        <Tab.Screen name="Ranking" component = {Ranking}/>

        </Tab.Navigator>
    </NavigationContainer>
);
}