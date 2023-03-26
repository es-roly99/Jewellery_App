import React from 'react';
import { View } from 'react-native';
import generalStyles from '../styles/generalStyles';

import listStyle from '../styles/listStyle';

function Separator({ month }) {


    return (
        <View style = {Object.assign({}, generalStyles.flexCenter)}>
            <View style = {listStyle.separator}/>
            <Text>{month}</Text>
            <View style = {listStyle.separator}/>
        </View>
    );
}

export default Separator;