import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, Text } from 'react-native';
import { ScrollView, View } from 'react-native';
import generalStyles from '../styles/generalStyles';
import listStyle from '../styles/listStyle';
import SelectDropdown from 'react-native-select-dropdown'
import ListItemJewel from '../components/ListItemJewel'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faAngleUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { colors, JEWELS } from '../Constants';
import { getJewels } from '../services/jewelService';
import { searchById } from '../services/jewelService'
import LoadingScreen from '../components/LoadingScreen';
import { RefreshControl } from 'react-native-gesture-handler';


function Home({ route, navigation }) {

    const [jewels, setJewels] = useState([])
    const [jewelType, setJewelType] = useState()
    const [isLoading, setIsLoading] = useState()
    const [searchId, setSearchId] = useState()

    useEffect(() => {
        setJewelType("Todas")
        setIsLoading(true)
        getJewels("").then((jewels) => {
            setJewels(jewels)
            setIsLoading(false)
        })
        setSearchId("")
    }, [])

    useEffect(()=>{
        if (route.params != undefined)setJewels(route.params['jewels'])
    },[route])

    return (
        <ScrollView horizontal={false} style={{ width: "100%" }}>

            <RefreshControl
                progressBackgroundColor="red"
                tintColor="red"
                refreshing={() => { }}
                onRefresh={() => { }} />

            <View style={Object.assign({}, generalStyles.flexBetween, generalStyles.area)}>

                <View style={generalStyles.flexLeft}>
                    <SelectDropdown
                        renderDropdownIcon={isOpened => { return <FontAwesomeIcon icon={isOpened ? faAngleUp : faAngleDown} color={'#444'} size={14} /> }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={generalStyles.dropDownMenu}
                        rowStyle={generalStyles.dropDownMenuRow}
                        rowTextStyle={generalStyles.dropDownMenuRowText}
                        buttonStyle={generalStyles.dropDownMenuButton}
                        buttonTextStyle={generalStyles.dropDownMenuButtonText}

                        data={["Todas", "Anillos", "Argollas", "Dijes", "Pulsos", "Cadenas"]}
                        defaultValue={jewelType}
                        onSelect={async (selectedItem, index) => {
                            setIsLoading(true)
                            setSearchId("")
                            setJewelType(selectedItem)
                            if (index == 0) {
                                await getJewels("").then((jewels) => {
                                    setJewels(jewels)
                                    setIsLoading(false)
                                })
                            }
                            else {
                                await getJewels(JEWELS[selectedItem]).then((jewels) => {
                                    setJewels(jewels)
                                    setIsLoading(false)
                                })
                            }
                        }}
                    />
                </View>

                <View style={Object.assign({}, generalStyles.minShadow, generalStyles.flexRight)}>
                    <TextInput
                        style={generalStyles.search}
                        placeholder="Id"
                        keyboardType='numeric'
                        value={searchId}
                        maxLength={3}
                        onChangeText={(text) => setSearchId(text)}
                        onSubmitEditing={async () => {
                            setIsLoading(true)
                            await searchById(searchId).then((x) => {
                                setJewels(x)
                                setIsLoading(false)
                            })
                        }}
                    />

                    <TouchableOpacity style={Object.assign({}, generalStyles.flexCenter, generalStyles.buttonAddJewell, generalStyles.minShadow)}
                        onPress={() => {
                            navigation.navigate('AddJewel', { jewel: undefined, jewels: jewels })
                        }}>
                        <FontAwesomeIcon
                            style={generalStyles.flexCenter} color={colors.white}
                            size={25}
                            icon={faPlus}>
                        </FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={listStyle.viewList}>
                {
                    isLoading ?
                        <LoadingScreen /> : jewels.length != 0 ?
                            jewels.map((item) => { return <ListItemJewel key={item.jewelId} jewel={item} navigation={navigation} jewels={jewels} setJewels={setJewels} /> }) :
                            <Text style={generalStyles.text}>No hay coincidencias</Text>
                }
            </View>

        </ScrollView>
    );
}

export default Home;