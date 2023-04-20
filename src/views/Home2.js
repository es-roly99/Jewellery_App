import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ScrollView, View } from 'react-native';
import generalStyles from '../styles/generalStyles';
import listStyle from '../styles/listStyle';
import ListItemOtherJewel from '../components/ListItemOtherJewel'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../Constants';
import { getOtherJewels } from '../services/jewelService';
import LoadingScreen from '../components/LoadingScreen';
import { RefreshControl } from 'react-native-gesture-handler';


function Home2({ route, navigation }) {

    const [jewels, setJewels] = useState([])
    const [isLoading, setIsLoading] = useState()

    useEffect(() => {
       updateHome2()
    }, [route])

    function updateHome2(){
        setIsLoading(true)
        getOtherJewels("").then((jewels) => {
            setJewels(jewels)
            setIsLoading(false)
        })
    }

    return (
        <ScrollView horizontal={false} style={{ width: "100%" }}>

            <RefreshControl
                progressBackgroundColor="red"
                tintColor="red"
                refreshing={() => { }}
                onRefresh={() => { }} />

                <View style={Object.assign({}, generalStyles.minShadow, generalStyles.flexRight, generalStyles.area)}>
                    <TouchableOpacity style={Object.assign({}, generalStyles.flexCenter, generalStyles.buttonAddJewell, generalStyles.minShadow)}
                        onPress={() => {
                            navigation.navigate('AddOtherJewel', { jewel: undefined, jewels: jewels })
                        }}>
                        <FontAwesomeIcon
                            style={generalStyles.flexCenter} color={colors.white}
                            size={25}
                            icon={faPlus}>
                        </FontAwesomeIcon>
                    </TouchableOpacity>
                </View>


            <View style={listStyle.viewList}>
                {
                    isLoading ?
                        <LoadingScreen /> : jewels.length != 0 ?
                            jewels.map((item) => { 
                                if(item.quantity > 0) { 
                                    return<ListItemOtherJewel key={item.id} jewel={item} navigation={navigation} jewels={jewels} setJewels={setJewels} /> } 
                                }):
                            <Text style={generalStyles.text}>No hay Joyas que mostrar.</Text>

                }
            </View>

        </ScrollView>
    );
}

export default Home2;