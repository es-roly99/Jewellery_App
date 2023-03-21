import "react-native-gesture-handler"; //this should be the first import in your code
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { SafeAreaView} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import style from './src/styles/style';
import Home from './src/views/Home';
import Statistics from './src/views/Statistics';
import Sales from './src/views/Sales'
import JewelDetail from './src/views/JewelDetail'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartSimple, faCoins, faHome } from "@fortawesome/free-solid-svg-icons";
import {initDatabase} from './src/services/jewelService'
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {  

  useEffect(()=>{
    initDatabase()
  },[])

  return (
    <>
    <SafeAreaView>
          <StatusBar barStyle={'light-content'} />
    </SafeAreaView>
    
    <NavigationContainer style = {style.area}>
      <Drawer.Navigator initialRouteName='Home'>
       
        <Drawer.Screen 
        component={Home}
        name='Home'
        options={{title:"Inicio", drawerIcon: ({ color, number, focused }) => {
          return (<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>)}   
        }}/>        
    
        <Drawer.Screen 
        component={Sales}
        name='Sales'
        options={{title:"Ventas", drawerIcon: ({ color, number, focused }) => {
          return (<FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>)}   
        }}/>   

        <Drawer.Screen 
        component={Statistics}
        name='Statistics'
        options={{title:"Estadísticas", drawerIcon: ({ color, number, focused }) => {
          return (<FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon>)}   
        }}/>

        <Drawer.Screen 
        component={JewelDetail}
        name='AddJewel'
        options={{title: "Añadir Joya", drawerItemStyle:{display:"none"}}}
        />    

         <Drawer.Screen 
        component={JewelDetail}
        name='JewelDetails'
        options={{title: "Detalles de Joya", drawerItemStyle:{display:"none"}}}
        />   

      </Drawer.Navigator>
    </NavigationContainer>

    </>
  );
}

