import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { ScrollView, View } from "react-native";
import generalStyles from "../styles/generalStyles";
import jewelDetailStyle from "../styles/jewelDetailStyle";
import { transformImportJewels, deleteJewels, importCsv, createExcel } from '../services/aditionalService'
import * as DocumentPicker from "expo-document-picker";
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import * as XLSX from 'xlsx';
import { getJewels } from "../services/jewelService";


export default function Settings({ route, navigation }) {


  const [importedJewels, setImportedJewels] = useState()


  async function importJewels() {
    //const path = await DocumentPicker.getDocumentAsync({})
    // await transformImportJewels("").then(() => {
    //   Alert.alert("Importar", "Joyas importadas correctamente", [
    //     {
    //       text: 'Ok'
    //     }
    //   ])
    // })
    importCsv("../../data/Dije-Table1")
  }


  async function exportJewels() {

    createExcel().then((wb) => {
      const base64 = XLSX.write(wb, { type: "base64" });
      const filename = FileSystem.documentDirectory + "Joyas.xlsx";

      FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64
      }).then(() => {
        Sharing.shareAsync(filename);
      })
    })
    
  }





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
              onPress: async () => {
                await deleteJewels().then(() => {
                  Alert.alert("Borrar", "Inventario borrado exitosamente", [
                    {
                      text: 'Ok'
                    }
                  ])
                })
              }
            }
          ])}>
          <Text style={generalStyles.text}>Borrar Joyas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

