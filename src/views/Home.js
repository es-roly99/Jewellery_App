import React, { useState, useEffect } from 'react';
import {TextInput, TouchableOpacity } from 'react-native';
import {ScrollView, Text, View, FlatList} from 'react-native';
import style from '../styles/style';
import listStyle from '../styles/listStyle';
import SelectDropdown from 'react-native-select-dropdown'
import ListItem from '../components/ListItem'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faAngleUp, faPlus} from '@fortawesome/free-solid-svg-icons';
import { colors, JEWELS } from '../Constants';
import { create, getJewels } from '../services/jewelService';


function Home({navigation}){

    const [jewels, setJewels] = useState([])

    useEffect(() => {
        getJewels("").then((jewels) => {
            setJewels(jewels)
        })
    },[])


    return (
        <ScrollView horizontal={false} style={{ width: "100%" }}>
                        
            <View style = {Object.assign({},style.flexBetween, style.area)}>
                
                <View style = {style.flexLeft}>
                    <SelectDropdown 
                        renderDropdownIcon={isOpened=>{return<FontAwesomeIcon icon={isOpened ? faAngleUp:faAngleDown} color={'#444'} size={14}/>}}
                        dropdownIconPosition={'right'}
                        
                        dropdownStyle={style.dropDownMenu}
                        rowStyle={style.dropDownMenuRow}
                        rowTextStyle={style.dropDownMenuRowText}
                        buttonStyle={style.dropDownMenuButton}
                        buttonTextStyle={style.dropDownMenuButtonText}

                        data = {["Todas", "Anillos", "Argollas", "Dijes", "Pulsos", "Cadenas"]}
                        defaultValue = {"Todas"}
                        onSelect={(selectedItem, index) => {
                            if(index == 0){
                                getJewels("").then((jewels) => {
                                    setJewels(jewels)
                                })
                            }
                            else{
                                getJewels(JEWELS[selectedItem]).then((jewels) => {
                                    setJewels(jewels)
                                })
                            }
                        }}
                    />
                 </View>

                <View style = {Object.assign({}, style.minShadow, style.flexRight)}>
                    <TextInput
                    style = {style.search}
                    placeholder="Id"
                    keyboardType='numeric'
                    maxLength={3}/>

                    <TouchableOpacity style = {Object.assign({},style.flexCenter, style.buttonAddJewell, style.minShadow)}
                    onPress ={() => {
                        navigation.navigate('AddJewel', {jewel:undefined})
                    }}>
                    <FontAwesomeIcon  
                        style = {style.flexCenter} color = {colors.white}
                        size= {25}
                        icon={faPlus}>
                    </FontAwesomeIcon>
                    </TouchableOpacity>
                 </View>
            </View>


            <View style={listStyle.viewList}>
                {
                    jewels.map((item) => {if(item.description != "") return <ListItem key={item.id} jewel={item} navigation={navigation}/>})
                }
            </View>

        </ScrollView>
    );
  }
  
  export default Home;