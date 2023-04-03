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


function Export({ route, navigation }) {

    return (
      <></>
    );
}

export default Export;