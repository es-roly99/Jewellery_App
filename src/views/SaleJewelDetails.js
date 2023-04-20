import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import jewelDetailStyle from '../styles/jewelDetailStyle';
import generalStyles from '../styles/generalStyles';
import { getAviableId, restoreJewel, verifyNewJewel } from '../services/aditionalService';


function SaleJewelDetail({ route, navigation }) {

    const { jewel } = route.params
    const [jewelType, setJewelType] = useState()
    const [id, setId] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [gold, setGold] = useState()
    const [note, setNote] = useState()
    const [weight, setWeight] = useState()


    useEffect(() => {
        setJewelType(jewel.jewelType != "" ? jewel.jewelType : '-')
        setId(jewel.jewelId != undefined ? jewel.jewelId : '-')
        setDescription(jewel.description != undefined ? jewel.description : '-')
        setPrice(jewel.price != undefined ? JSON.stringify(jewel.price) : '-')
        setGold(jewel.gold != "" ? jewel.gold : '-')
        setNote(jewel.note != undefined ? jewel.note : '-')
        setWeight(jewel.weight != 0 ? JSON.stringify(jewel.weight) : '-')
    }, [route])

    return (

        <ScrollView style={jewelDetailStyle.scrollViewJewelDetails}>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text>Tipo de Joya:</Text>
                <Text style={jewelDetailStyle.textSalesDetails}>{jewelType}</Text>
            </View>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text>Identificador:</Text>
                <Text style={jewelDetailStyle.textSalesDetails}>{id}</Text>
            </View>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text>Descripción:</Text>
                <Text style={jewelDetailStyle.textSalesDetails}>{description}</Text>
            </View>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text>Oro:</Text>
                <Text style={jewelDetailStyle.textSalesDetails}>{gold}</Text>
            </View>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text>Peso:</Text>
                <Text style={jewelDetailStyle.textSalesDetails}>{weight}</Text>
            </View>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text>Precio:</Text>
                <Text style={jewelDetailStyle.textSalesDetails}>{price}</Text>
            </View>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text >Nota:</Text>
                <Text style={Object.assign({}, jewelDetailStyle.textSalesDetails)}>{note}</Text>
            </View>

            <View style={Object.assign({}, jewelDetailStyle.viewJewelDetailLast, generalStyles.flexEvenly)}>
            <TouchableOpacity style={Object.assign({}, jewelDetailStyle.buttonCancel, generalStyles.shadow, generalStyles.flexCenter)}
                    onPress={() => navigation.navigate('Sales')}>
                    <Text style={generalStyles.textColorWhite}>Atrás</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Object.assign({}, jewelDetailStyle.buttonSave, generalStyles.shadow, generalStyles.flexCenter)}
                    onPress={() => {
                        Alert.alert("Restaurar", "Desea conservar esta joya en las ventas?", [
                            {
                                text: 'Cancelar',
                                style: 'cancel',
                            },
                            {
                                text: 'Si',
                                onPress: () => {
                                    restoreJewel(jewel, "conservar")
                                    navigation.navigate('Sales')
                                }
                            },
                            {
                                text: 'No',
                                onPress: () => {
                                    restoreJewel(jewel, "borrar")
                                    navigation.navigate('Sales')
                                }
                            }
                        ])
                    }}>
                    <Text style={generalStyles.textColorWhite}>Restaurar</Text>
            </TouchableOpacity>
            </View>
            

        </ScrollView>
    );
}

export default SaleJewelDetail;