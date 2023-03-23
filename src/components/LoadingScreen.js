import React from 'react';
import { Text, TouchableOpacity, View, Image, Alert, ActivityIndicator } from 'react-native';
import listStyle from '../styles/listStyle';
import generalStyles from '../styles/generalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { deleteJewel } from '../services/jewelService';
import { color } from 'react-native-reanimated';
import { colors } from '../Constants';

function LoadingScreen({ jewel, navigation }) {


    return (
        <View style={Object.assign({}, generalStyles.flexCenter, generalStyles.loadingScreen)} >
            <ActivityIndicator size={'large'} color={colors.add} />
        </View>
    );
}

export default LoadingScreen;