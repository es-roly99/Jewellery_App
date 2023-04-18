import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from "react";
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import generalStyles from './src/styles/generalStyles';
import Home from './src/views/Home';
import Statistics from './src/views/Statistics';
import Sales from './src/views/Sales'
import JewelDetail from './src/views/JewelDetail'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartSimple, faCoins, faGem, faBoxesStacked, faGear, faL } from "@fortawesome/free-solid-svg-icons";
import { initDatabase } from './src/services/jewelService'
import Home2 from "./src/views/Home2";
import OtherJewelDetail from "./src/views/OtherJewelDetail";
import SaleJewelDetail from "./src/views/SaleJewelDetails";
import Settings from "./src/views/Settings";
import { deleteJewels } from "./src/services/aditionalService";

export default function App() {

  const Drawer = createDrawerNavigator();

  global.isRequiredRefreshSales = true
  global.isRequiredRefreshStatistics = true

  useEffect(() => {
    initDatabase()
  }, [])

  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
      </SafeAreaView>

      <NavigationContainer style={generalStyles.area} >
        <Drawer.Navigator initialRouteName='Home' >

          <Drawer.Screen
            component={Home}
            name='Home'
            options={{
              title: "Joyas", drawerIcon: ({ color, number, focused }) => {
                return (<FontAwesomeIcon icon={faGem}></FontAwesomeIcon>)
              }
            }} />

          <Drawer.Screen
            component={Home2}
            name='Home2'
            options={{
              title: "Otras Joyas", drawerIcon: ({ color, number, focused }) => {
                return (<FontAwesomeIcon icon={faBoxesStacked}></FontAwesomeIcon>)
              }
            }} />


          <Drawer.Screen
            component={Sales}
            name='Sales'
            options={{
              title: "Ventas", drawerIcon: ({ color, number, focused }) => {
                return (<FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>)
              }
            }} />

          <Drawer.Screen
            component={OtherJewelDetail}
            name='OtherJewelDetail'
            options={{ title: "Detalles de Joya", drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            component={Statistics}
            name='Statistics'
            options={{
              title: "Estadísticas", drawerIcon: ({ color, number, focused }) => {
                return (<FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon>)
              }
            }} />

          <Drawer.Screen
            component={Settings}
            name='Settings'
            options={{
              title: "Ajustes", drawerIcon: ({ color, number, focused }) => {
                return (<FontAwesomeIcon icon={faGear}></FontAwesomeIcon>)
              }
            }} />

          <Drawer.Screen
            component={JewelDetail}
            name='AddJewel'
            options={{ title: "Añadir Joya", drawerItemStyle: { display: "none" } }}
          />

          <Drawer.Screen
            component={JewelDetail}
            name='JewelDetails'
            options={{ title: "Detalles de Joya", drawerItemStyle: { display: "none" } }}
          />



          <Drawer.Screen
            component={SaleJewelDetail}
            name='SaleJewelDetails'
            options={{ title: "Detalles de Joya", drawerItemStyle: { display: "none" } }}
          />

          <Drawer.Screen
            component={OtherJewelDetail}
            name='AddOtherJewel'
            options={{ title: "Añadir Joya", drawerItemStyle: { display: "none" } }}
          />

        </Drawer.Navigator>
      </NavigationContainer>

    </>
  );
}

