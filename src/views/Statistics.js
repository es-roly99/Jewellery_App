import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import listStyle from '../styles/listStyle';
import { getSaleJewel, getSalesMonth, getSalesPorcent } from '../services/jewelService';
import { RefreshControl } from 'react-native-gesture-handler';
import LoadingScreen from '../components/LoadingScreen';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
import generalStyles from '../styles/generalStyles';
import { color } from 'react-native-reanimated';
import { MONTH, colors } from '../Constants';


function Statistics({ navigation }) {

    const [chainPercent, setChainPercent] = useState(0)
    const [ringPercent, setRingPercent] = useState(0)
    const [braceletPercent, setBraceletPercent] = useState(0)
    const [pendantPercent, setPendantPercent] = useState(0)
    const [earringPercent, setEarringPercent] = useState(0)
    const [month, setMonth] = useState([])
    const [monthValue, setMonthValue] = useState([0])

    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState()

    useEffect(() => {
        setIsLoading(true)
        getSalesPorcent().then((data) => {
            data.map((x) => {
                if (x.jewelType == "Anillo") setRingPercent(x.price)
                else if (x.jewelType == "Dije") setPendantPercent(x.price)
                else if (x.jewelType == "Pulso") setBraceletPercent(x.price)
                else if (x.jewelType == "Argolla") setEarringPercent(x.price)
                else if (x.jewelType == "Cadena") setChainPercent(x.price)
            })
        })
        getSalesMonth().then((data) => {
            setMonth(data.map((x) => MONTH[x.month]))
            setMonthValue(data.map((x) => parseInt(x.price)))
            setIsLoading(false)
        })
    }, [])

    onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    }    


    return (
        <ScrollView horizontal={false} style={{ width: "100%" }}>

            <RefreshControl
                refreshing={() => { refreshing}}
                onRefresh={() => { onRefresh}} />

            <View style={listStyle.viewList}>
                {
                    isLoading ?
                        <LoadingScreen /> :
                        <>

                            <View>
                                <Text style={generalStyles.statisticText}>Ventas por Mes</Text>
                                <LineChart
                                    data={{
                                        labels: month,
                                        datasets: [{ data: monthValue }],
                                    }}
                                    width={Dimensions.get('window').width - 20} // from react-native
                                    height={250}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#efefef',
                                        backgroundGradientTo: '#efefef',
                                        decimalPlaces: 0, // optional, defaults to 2dp
                                        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 5,
                                    }}
                                />
                            </View>

                            <View style={generalStyles.navbar}>
                                <Text style={generalStyles.statisticText}>Porcentaje de Joyas Vendidas</Text>
                                <PieChart
                                    data={[
                                        {
                                            name: 'Anillos',
                                            population: ringPercent,
                                            color: colors.redChart,
                                            legendFontColor: '#000000',
                                            legendFontSize: 17,
                                        },
                                        {
                                            name: 'Argollas',
                                            population: earringPercent,
                                            color: colors.orangeChart,
                                            legendFontColor: '#000000',
                                            legendFontSize: 17,
                                        },
                                        {
                                            name: 'Dijes',
                                            population: pendantPercent,
                                            color: colors.greenChart,
                                            legendFontColor: '#000000',
                                            legendFontSize: 17,
                                        },
                                        {
                                            name: 'Pulsos',
                                            population: braceletPercent,
                                            color: colors.blueChart,
                                            legendFontColor: '#000000',
                                            legendFontSize: 17,
                                        },
                                        {
                                            name: 'Cadenas',
                                            population: chainPercent,
                                            color: colors.darkBlueChart,
                                            legendFontColor: '#000000',
                                            legendFontSize: 17,
                                        },
                                    ]}
                                    width={Dimensions.get('window').width - 16}
                                    height={250}
                                    chartConfig={{
                                        backgroundColor: '#1cc910',
                                        backgroundGradientFrom: '#eff3ff',
                                        backgroundGradientTo: '#efefef',
                                        decimalPlaces: 1,
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        style: {
                                            borderRadius: 16,
                                        },
                                    }}
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 16,
                                    }}
                                    accessor="population"
                                    backgroundColor="transparent"
                                    paddingLeft="15"
                                />
                            </View>


                        </>
                }
            </View>

        </ScrollView>
    );
}

export default Statistics;