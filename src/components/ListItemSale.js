import React, { useState } from 'react';
import {Text, View } from 'react-native';
import listStyle from '../styles/listStyle';
import generalStyles from '../styles/generalStyles';


function ListItemSale({jewel, navigation}){

    const [day, setDay] = useState(jewel.day)


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
                <Text numberOfLines={1} style = {Object.assign({}, listStyle.date)}>
                    {day} 
                </Text>
            </View>

        </View>
    );
  }
  
  export default ListItemSale;