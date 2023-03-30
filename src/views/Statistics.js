import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import generalStyles from '../styles/generalStyles';
import listStyle from '../styles/listStyle';
import ListItemSale from '../components/ListItemSale'
import { getSaleJewel } from '../services/jewelService';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Separator from '../components/Separator'
import { MONTH } from '../Constants';
import { RefreshControl } from 'react-native-gesture-handler';
import LoadingScreen from '../components/LoadingScreen';

function Sales({ navigation }) {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState()

    useEffect(() => {
        setIsLoading(true)
        getSaleJewel().then((data) => {
            setData(data)
            setIsLoading(false)
        })
    }, [])

    return (
        <ScrollView horizontal={false} style={{ width: "100%" }}>

            <RefreshControl
                progressBackgroundColor="red"
                tintColor="red"
                refreshing={() => { }}
                onRefresh={() => { }} />

            <View style={listStyle.viewList}>
                {
                    isLoading ?
                        <LoadingScreen /> :
                        <></>
                }
            </View>

        </ScrollView>
    );
}

export default Sales;