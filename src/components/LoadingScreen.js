import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import generalStyles from '../styles/generalStyles';

import { colors } from '../Constants';

function LoadingScreen({ jewel, navigation }) {


    return (
        <View style={Object.assign({}, generalStyles.flexCenter, generalStyles.loadingScreen)} >
            <ActivityIndicator size={'large'} color={colors.add} />
        </View>
    );
}

export default LoadingScreen;