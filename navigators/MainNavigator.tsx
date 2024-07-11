import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { NavigationContainer } from '@react-navigation/native';


import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MascotaScreen from '../screens/MascotaScreen';
import ListaMascotaScreen from '../screens/ListaMascotaScreen';
import CamaraScreen from '../screens/CamaraScreen';
import GaleriaScreen from '../screens/GaleriaScreen';
import MapaScreen from '../screens/MapaScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Drawer" component={MyDrawer} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator >
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        <Drawer.Screen name='Mascota' component={MyTops}/>
        <Drawer.Screen name='Camara' component={CamaraScreen}/> 
        <Drawer.Screen name='Galeria' component={GaleriaScreen}/> 
        <Drawer.Screen name='Mapa' component={MapaScreen}/> 
    </Drawer.Navigator>
  );
}

const Top = createMaterialTopTabNavigator();

function MyTops() {
  return (
    <Top.Navigator>
      <Top.Screen name="GestionMascota" component={MascotaScreen} />
      <Top.Screen name="ListaMascota" component={ListaMascotaScreen} />
    </Top.Navigator>
  );
}


export default function MainNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}