import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import listStyle from '../styles/listStyle';
import generalStyles from '../styles/generalStyles';


function ListItemSale({ jewel, navigation }) {


    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('SaleJewelDetails', {jewel: jewel})
            }}>

            <View style={Object.assign({}, listStyle.listItem, generalStyles.flexBetween)}>

                <View style={generalStyles.flexLeft}>
                    <Text style={Object.assign({}, listStyle.textListItemId)}>
                        {jewel.jewelId != undefined ? jewel.jewelId : "-  "}
                    </Text>
                    <Text numberOfLines={1} style={Object.assign({}, listStyle.textListItemDescription)}>
                        {jewel.description}
                    </Text>
                </View>

                <View style={generalStyles.flexRight}>
                    <Text numberOfLines={1} style={Object.assign({}, listStyle.date)}>
                        {jewel.day}/{jewel.month}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    );
}

export default ListItemSale;