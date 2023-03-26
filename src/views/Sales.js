import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import generalStyles from '../styles/generalStyles';
import listStyle from '../styles/listStyle';
import ListItemSale from '../components/ListItemSale'
import { getSaleJewel } from '../services/jewelService';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Separator } from '../components/Separator'

function Sales({ navigation }) {

    const [jewels, setJewels] = useState([])
    const [actualMonth, setActualMonth] = useState(0)
    const [actualWeek, setActualWeek] = useState(-1)

    useEffect(() => {
        getSaleJewel().then((jewels) => {
            setJewels(jewels)
        })
    }, [])

    return (
        <ScrollView horizontal={false} style={{ width: "100%" }}>

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
                    jewels.map((item) => {
                        console.log(item)
                        return <ListItemSale key={item.id} jewel={item} navigation={navigation} />
                        // if (actualWeek != item.week) {
                        //     setActualWeek(item.week)
                        //     return //<Separator month={actualMonth}></Separator>
                        // }
                       //return <Separator month={actualMonth}></Separator> //<ListItemSale key={item.id} jewel={item} navigation={navigation} />
                    })
                }
            </View>

        </ScrollView>
    );
}

export default Sales;