import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import listStyle from '../styles/listStyle';
import { getSaleJewel } from '../services/jewelService';
import { RefreshControl } from 'react-native-gesture-handler';
import LoadingScreen from '../components/LoadingScreen';

function Sales({ navigation }) {

    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']

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
                        <>
                            <View>
                                <Text>Doughnut</Text>
                            </View>
                        </>
                }
            </View>

        </ScrollView>
    );
}

export default Sales;