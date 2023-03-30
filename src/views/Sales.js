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

    const [jewels, setJewels] = useState([])
    const [isLoading, setIsLoading] = useState()
    let actualWeek = -1

    useEffect(() => {
        setIsLoading(true)
        getSaleJewel().then((data) => {
            setJewels(data)
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

            <View style={Object.assign({}, generalStyles.area)}>

                <View style={generalStyles.flexLeft}>
                    <SelectDropdown
                        renderDropdownIcon={isOpened => { return <FontAwesomeIcon icon={isOpened ? faAngleUp : faAngleDown} color={'#444'} size={14} /> }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={generalStyles.dropDownMenu2}
                        rowStyle={generalStyles.dropDownMenuRow}
                        rowTextStyle={generalStyles.dropDownMenuRowText}
                        buttonStyle={generalStyles.dropDownMenuButton}
                        buttonTextStyle={generalStyles.dropDownMenuButtonText}

                        data={["Fecha"]}
                        defaultButtonText={"Ordenar"}
                        defaultValue={0}

                    />
                </View>

            </View>

            <View style={listStyle.viewList}>
                {
                    isLoading ?
                        <LoadingScreen /> :
                        jewels.map((item) => {
                            if (actualWeek == item.week) {
                                return <ListItemSale key={item.id} jewel={item} navigation={navigation} />
                            }
                            else {
                                actualWeek = item.week
                                return <View key={item.id}>
                                    <Separator month={MONTH[item.month]}></Separator>
                                    <ListItemSale jewel={item} navigation={navigation} />
                                </View>
                            }

                        })
                }
            </View>

        </ScrollView>
    );
}

export default Sales;