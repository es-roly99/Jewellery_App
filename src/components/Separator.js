import React from 'react';
import { View, Text } from 'react-native';
import { sizes } from '../Constants';
import generalStyles from '../styles/generalStyles';
import listStyle from '../styles/listStyle';

function Separator({ month }) {

    return (
        <View style = {Object.assign({}, listStyle.separatorArea)}>
            <View style = {listStyle.separator}/>
           <Text style = {{fontSize: sizes.header}}>{month}</Text>
            <View style = {listStyle.separator}/>
        </View>
    );
}

export default Separator;