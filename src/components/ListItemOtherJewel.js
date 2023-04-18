import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import listStyle from '../styles/listStyle';
import generalStyles from '../styles/generalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDollar } from '@fortawesome/free-solid-svg-icons';
import { saleJewel, saleOtherJewel } from '../services/aditionalService';
import { getOtherJewels } from '../services/jewelService';
import DialogInput from 'react-native-dialog-input';

function ListItemOtherJewel({ jewel, navigation, jewels, setJewels }) {


    const [sellVisible, setSellVisible] = useState(false)
    const [quantitySell, setQuantitySell] = useState()


    return (
        <View style={Object.assign({}, listStyle.listItem2, generalStyles.flexBetween)}>

            <TouchableOpacity style={generalStyles.flexCenter}
                onPress={() => navigation.navigate('OtherJewelDetail', { jewel: jewel, jewels: jewels })}>
                <View style={generalStyles.flexLeft}>
                    <Text numberOfLines={1} style={Object.assign({}, listStyle.textListItemDescription)}>
                        {jewel.description} ${jewel.price}.0
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={generalStyles.flexRight}>

                <Text style ={listStyle.quantityJewel}>{jewel.quantity}</Text>

                <DialogInput
                isDialogVisible={sellVisible}
                title={"Vender"}
                message={jewel.description+" $"+jewel.price+".0"}
                hintInput ={"Cantidad"}
                cancelText = {"Cancelar"}
                submitText = {"Ok"}

                submitInput={ (inputText) => {
                    setQuantitySell(inputText),
                    setSellVisible(false);
                    const actualQuanitty = jewel.quantity - inputText
                    saleOtherJewel(jewel, inputText, actualQuanitty)
                    getOtherJewels("").then((jewels) => {
                        setJewels(jewels)
                    })
                }}
                closeDialog={() => setSellVisible(false)}>
            </DialogInput>

                <TouchableOpacity style={generalStyles.flexCenter} onPress={() => setSellVisible(true)}>
                    <FontAwesomeIcon
                        style={Object.assign({}, generalStyles.minShadow, listStyle.buttonSell2)}
                        size={25}
                        icon={faDollar}>
                    </FontAwesomeIcon>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default ListItemOtherJewel;