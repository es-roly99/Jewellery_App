import React, { useEffect, useState, useRef, Component } from 'react';
import { View, Text, TouchableOpacity, Alert, BackHandler } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import jewelDetailStyle from '../styles/jewelDetailStyle';
import generalStyles from '../styles/generalStyles';
import { getJewelId, putOtherJewel, postOtherJewel } from '../services/jewelService';
import { getAviableId, verifyNewJewel, verifyNewOtherJewel } from '../services/aditionalService';


function OtherJewelDetail({ route, navigation }) {

    const { jewel, jewels } = route.params
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [note, setNote] = useState()
    const [quantity, setQuantity] = useState()
    const [id, setId] = useState()

    useEffect(() => {
        setId(jewel != undefined ? jewel.id : "")
        setDescription(jewel != undefined ? jewel.description : '')
        setPrice(jewel != undefined ? JSON.stringify(jewel.price) : '')
        setNote(jewel != undefined ? jewel.note : '')
        setQuantity(jewel != undefined ? JSON.stringify(jewel.quantity) : '')
    }, [route])

    return (

        <ScrollView style={jewelDetailStyle.scrollViewJewelDetails}>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text>Descripción:</Text>
                <TextInput style={jewelDetailStyle.textInputDetails} value={description}
                    onChangeText={text => setDescription(text)}/>
            </View>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text>Cantidad:</Text>
                <TextInput keyboardType="numeric" style={jewelDetailStyle.textInputDetails} value={quantity} 
                    onChangeText={(text) => setQuantity(text)}/>
            </View>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text>Precio:</Text>
                <TextInput keyboardType="numeric" style={jewelDetailStyle.textInputDetails} value={price}
                    onChangeText={(text) => setPrice(text)}/>
            </View>

            <View style={jewelDetailStyle.viewJewelDetail}>
                <Text >Nota:</Text>
                <TextInput style={Object.assign({}, jewelDetailStyle.textInputDetails)} value={note}
                    onChangeText={(text) => setNote(text)}/>
            </View>

            <View style={Object.assign({}, jewelDetailStyle.viewJewelDetailLast, generalStyles.flexAround)}>

                <TouchableOpacity style={Object.assign({}, jewelDetailStyle.buttonCancel, generalStyles.shadow, generalStyles.flexCenter)}
                    onPress={() => navigation.navigate('Home2')}>
                    <Text style={generalStyles.textColorWhite}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Object.assign({}, jewelDetailStyle.buttonSave, generalStyles.shadow, generalStyles.flexCenter)}
                    onPress={() => {
                        const verify = verifyNewOtherJewel(description, price, quantity)
                        let arr = [...jewels]
                        let pos = 0
                        if(arr.length > 0){
                            while(arr[pos].jewelId < id) {
                                pos ++
                            }
                        }
                        if (verify == "") {
                            if (jewel == undefined) {
                                postOtherJewel(description, price, quantity, note)
                                const newJewel = {id:-1,description:description,price:parseInt(price),quantity:parseInt(quantity),note:note}
                                arr.splice(pos, 0, newJewel)
                            }
                            else {
                                putOtherJewel(jewel.id, description, price, quantity, note)
                                const newJewel = {id:jewel.id,description:description,price:parseInt(price),quantity:parseInt(quantity),note:note}
                                arr.splice(pos, 1, newJewel)
                            }
                            navigation.navigate('Home2', {jewels: arr})
                        }
                        else {
                            Alert.alert("Error", verify, [
                                {
                                    text: 'OK',
                                    style: 'cancel',
                                }
                            ])
                        }
                    }}>
                    <Text style={generalStyles.textColorWhite}>Guardar</Text>

                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

export default OtherJewelDetail;