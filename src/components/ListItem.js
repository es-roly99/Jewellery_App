import React from 'react';
import {Text, TouchableOpacity, View, Image, Alert} from 'react-native';
import listStyle from '../styles/listStyle';
import generalStyles from '../styles/generalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { deleteJewel } from '../services/jewelService';

function ListItem({jewel, navigation}){


    return (
        <View style = {Object.assign({}, listStyle.listItem, generalStyles.flexBetween)}>

            <View style = {generalStyles.flexLeft}>
                <Text style = {Object.assign({}, listStyle.textListItemId)}> 
                    {jewel.jewelId} 
                </Text>
                <Text numberOfLines={1} style = {Object.assign({}, listStyle.textListItemDescription)}>
                    {jewel.description} 
                </Text>
            </View>

            <View style = {generalStyles.flexRight}>
                <TouchableOpacity style = {generalStyles.flexCenter} 
                    onPress ={() => navigation.navigate('JewelDetails', {jewel: jewel})}>
                    <FontAwesomeIcon  
                        style = {Object.assign({},generalStyles.minShadow, listStyle.buttonEdit)} 
                        size= {25}
                        icon={faEdit}>
                    </FontAwesomeIcon>
                </TouchableOpacity>
                
                <TouchableOpacity style = {generalStyles.flexCenter}
                    onPress ={()=> 
                        Alert.alert("Vender", jewel.description + " $" + jewel.price + ".0", [
                            {
                                text: 'Cancelar',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK', 
                                onPress: () => deleteJewel(jewel.id)
                            }
                        ])
                    }>
                    <FontAwesomeIcon  
                        style = {Object.assign({},generalStyles.minShadow, listStyle.buttonSell)} 
                        size= {25}
                        icon={faDollar}>
                    </FontAwesomeIcon>
                </TouchableOpacity>
            </View>

        </View>
    );
  }
  
  export default ListItem;