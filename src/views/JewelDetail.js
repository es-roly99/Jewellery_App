import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import jewelDetailStyle from '../styles/jewelDetailStyle';
import style from '../styles/style';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import { JEWELSID } from '../Constants';
import { getJewelId, postJewel, putJewel } from '../services/jewelService';
import { getAviableId } from '../services/searchService';


function JewelDetail({route, navigation}){

    const jewels = ["Anillo", "Argolla", "Dije", "Pulso", "Cadena"]
    const [aviableId, setAviableId] = useState([])

    const {jewel} = route.params
    const [jewelType, setJewelType] = useState("Selecione Joya")
    const [id, setId] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [gold, setGold] = useState()
    const [note, setNote] = useState()
    const [weight, setWeight] = useState()
    const [isJewel, setIsJewel] = useState()

    useEffect(()=>{
        setJewelType(jewel != undefined ? jewel.jewelType : "Selecione Joya")
        setId(jewel != undefined ? jewel.jewelId : '')
        setDescription(jewel != undefined ? jewel.description : '')
        setPrice(jewel != undefined ? JSON.stringify(jewel.price) : '')
        setGold(jewel!= undefined ?jewel.gold : 10)
        setNote(jewel!= undefined ?jewel.note : '')
        setWeight(jewel!= undefined ?JSON.stringify(jewel.weight) : '')
        setIsJewel(jewel == undefined ? false : true)
    },[])

    useEffect(()=>{
        if (jewelType!= "Selecione Joya"){
            const range = JEWELSID[jewelType]
            getJewelId(range).then((ids) => {
                setAviableId(getAviableId(ids, range))
            })
        }
    },[jewelType])

    useEffect(()=>{
        if(jewel == undefined){
            setId(aviableId[0])
        }
    },[aviableId])

    return (
        
        <ScrollView style = {jewelDetailStyle.scrollViewJewelDetails}>
            
            <View style = {jewelDetailStyle.viewJewelDetail}>
                <Text>Tipo de Joya:</Text>
                <SelectDropdown data={jewels} defaultButtonText = {jewelType} 
                renderDropdownIcon={isOpened=>{
                    if(jewel == undefined){
                        return<FontAwesomeIcon icon={isOpened ? faAngleUp:faAngleDown} color={'#444'} size={14}/>}
                    }
                }
                dropdownIconPosition={'right'}
                dropdownStyle={jewelDetailStyle.dropDownMenu}
                rowStyle={jewelDetailStyle.dropDownMenuRow}
                rowTextStyle={jewelDetailStyle.dropDownMenuRowText}
                buttonStyle={jewelDetailStyle.dropDownMenuButton}
                buttonTextStyle={jewelDetailStyle.dropDownMenuButtonText}
                disabled = {jewel==undefined ? false : true}
                onSelect={(selectedItem, index) => {
                    setIsJewel(true)
                    setJewelType(selectedItem)
                  }}/>
            </View>
            
            <View style = {jewelDetailStyle.viewJewelDetail}>
                <Text>Identificador:</Text>
                <SelectDropdown data={aviableId} defaultValue = {id} defaultButtonText = {jewel != undefined ? jewel.jewelId : "Seleccione Id"}
                renderDropdownIcon={isOpened=>{
                    if(jewel == undefined){
                        return<FontAwesomeIcon icon={isOpened ? faAngleUp:faAngleDown} color={'#444'} size={14}/>}
                    }
                }
                dropdownIconPosition={'right'}
                dropdownStyle={jewelDetailStyle.dropDownMenu}
                rowStyle={jewelDetailStyle.dropDownMenuRow}
                rowTextStyle={jewelDetailStyle.dropDownMenuRowText}
                buttonStyle={jewelDetailStyle.dropDownMenuButton}
                buttonTextStyle={jewelDetailStyle.dropDownMenuButtonText}
                disabled = {isJewel & jewel==undefined ? false : true}
                onSelect={(selectedItem, index) => {
                    setId(selectedItem)
                  }}/>
            </View> 

            <View style = {jewelDetailStyle.viewJewelDetail}>
                
                <Text>Descripción:</Text>
                <TextInput style = {jewelDetailStyle.textInputDetails} value={description}
                onChangeText={text => setDescription(text)} 
                editable= {isJewel ? true : false}
                />
            </View>

            <View style = {jewelDetailStyle.viewJewelDetail}>
                <Text>Oro:</Text>
                <SelectDropdown data={[10, 14, 18]} defaultValue={gold} 
                renderDropdownIcon={isOpened=>{return<FontAwesomeIcon icon={isOpened ? faAngleUp:faAngleDown} color={'#444'} size={14}/>}}
                dropdownIconPosition={'right'}
                dropdownStyle={jewelDetailStyle.dropDownMenu}
                rowStyle={jewelDetailStyle.dropDownMenuRow}
                rowTextStyle={jewelDetailStyle.dropDownMenuRowText}
                buttonStyle={jewelDetailStyle.dropDownMenuButton}
                buttonTextStyle={jewelDetailStyle.dropDownMenuButtonText}
                disabled = {isJewel ? false : true}
                onSelect={(selectedItem, index) => {
                    setGold(selectedItem)
                  }}/>
            </View>

            <View style = {jewelDetailStyle.viewJewelDetail}>
                <Text>Peso:</Text>
                <TextInput keyboardType="numeric" style = {jewelDetailStyle.textInputDetails} value={weight}
                onChangeText = {(text) => setWeight(text)}
                editable= {isJewel ? true : false}
                />
            </View>

            <View style = {jewelDetailStyle.viewJewelDetail}>
                <Text>Precio:</Text>
                <TextInput keyboardType="numeric" style = {jewelDetailStyle.textInputDetails} value={price}
                onChangeText = {text => setPrice(text)}
                editable= {isJewel ? true : false}
                />
            </View>

            <View style = {jewelDetailStyle.viewJewelDetail}>
                <Text >Nota:</Text>
                <TextInput style = {Object.assign({},jewelDetailStyle.textInputDetails, style.shadow)} value={note}
                onChangeText = {(text) => setNote(text)}
                editable= {isJewel ? true : false}
                />
            </View>

            <View style = {Object.assign({}, jewelDetailStyle.viewJewelDetailLast, style.flexAround)}>
                
                <TouchableOpacity style = {Object.assign({},jewelDetailStyle.buttonCancel, style.shadow, style.flexCenter)}
                onPress ={() => navigation.navigate('Home')}> 
                    <Text style = {style.textColorWhite}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = {Object.assign({},jewelDetailStyle.buttonSave, style.shadow, style.flexCenter)}
                onPress = {()=> {
                    if(jewel == undefined){
                        postJewel(jewelType, id, description, gold, weight, price, note)
                    }
                    else{
                        putJewel(jewel.id, description, gold, weight, price, note)
                    }
                    navigation.navigate('Home')
                }}>
                    <Text style = {style.textColorWhite}>Guardar</Text>
                
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
  }
  
  export default JewelDetail;