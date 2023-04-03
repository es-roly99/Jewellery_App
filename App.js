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
import { faChartSimple, faCoins, faGem, faArrowUpFromBracket, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { initDatabase } from './src/services/jewelService'
import Export from "./src/views/Export";
import Home2 from "./src/views/Home2";
import OtherJewelDetail from "./src/views/OtherJewelDetail";


export default function App() {

  const Drawer = createDrawerNavigator();

  useEffect(() => {
    initDatabase()
  }, [])

  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} />
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
            component={Statistics}
            name='Statistics'
            options={{
              title: "Estadísticas", drawerIcon: ({ color, number, focused }) => {
                return (<FontAwesomeIcon icon={faChartSimple}></FontAwesomeIcon>)
              }
            }} />

          <Drawer.Screen
            component={Export}
            name='Export'
            options={{
              title: "Exportar", drawerIcon: ({ color, number, focused }) => {
                return (<FontAwesomeIcon icon={faArrowUpFromBracket}></FontAwesomeIcon>)
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
            component={OtherJewelDetail}
            name='OtherJewelDetail'
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

