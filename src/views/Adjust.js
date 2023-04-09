import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { ScrollView, View } from "react-native";
import generalStyles from "../styles/generalStyles";
import jewelDetailStyle from "../styles/jewelDetailStyle";
import { importJewels, deleteJewels, exportJewels } from '../services/aditionalService'

export default function Adjust({ route, navigation }) {
  return (
    <ScrollView style={jewelDetailStyle.scrollViewJewelDetails}>
      <View style={generalStyles.viewJewel}>
        <TouchableOpacity style={Object.assign({}, generalStyles.flexCenter, generalStyles.buttonJewel)} onPress={() => importJewels()}>
          <Text style={generalStyles.text}>Importar Joyas</Text>
        </TouchableOpacity>
      </View>

      <View style={generalStyles.viewJewel}>
        <TouchableOpacity style={Object.assign({}, generalStyles.flexCenter, generalStyles.buttonJewel)} onPress={() => exportJewels()}>
          <Text style={generalStyles.text}>Exportar Joyas</Text>
        </TouchableOpacity>
      </View>

      <View style={[generalStyles.viewJewel, generalStyles.shadow]}>
        <TouchableOpacity style={Object.assign({}, generalStyles.flexCenter, generalStyles.buttonJewel)} onPress={() =>
          Alert.alert("Borrar", "Desea borrar todo el inventario?", [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Borrar',
              onPress: () => { deleteJewels() }
            }
          ])}>
          <Text style={generalStyles.text}>Borrar Joyas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

