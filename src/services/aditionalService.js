import { JEWELSID } from '../Constants'
import { deleteJewel, deleteJewelsT, deleteOtherJewel, deleteOthersJewelT, deleteSaleJewel, deleteSalesT, getJewelId, getJewelJewelId, initDatabase, postJewel, postJewelId, postSaleJewel } from './jewelService'
import { readString } from 'react-native-csv'

export function getAviableId(ids, range) {
    let v = range[0]
    let aviableIds = []

    for (let x in ids) {
        if (ids[x].jewelId == v) {
            v += 1
        }
        else {
            while (v < ids[x].jewelId) {
                aviableIds.push(v)
                v += 1
                if (aviableIds.length >= 3) {
                    break
                }
            }
            v += 1
        }
        if (aviableIds.length >= 3) {
            break
        }
    }

    if (aviableIds.length == 0) {
        aviableIds.push(v, v + 1, v + 2)
    }

    return aviableIds
}


export function verifyNewJewel(type, description, price, weight) {
    let err = ""
    if (type == "Seleccione Joya") err = "Seleccione el tipo de Joya"
    else if (description == "") err = "Introduzca la descripción"
    else if (price == "") err = "Introduzca el precio"
    else if (weight == "") err = "Introduzca el peso"
    return err
}

export function verifyNewOtherJewel(description, price, quantity) {
    let err = ""
    if (description == "") err = "Introduzca la descripción"
    else if (quantity == "") err = "Introduzca la cantidad"
    else if (price == "") err = "Introduzca el precio"
    return err
}


export function saleJewel(jewel) {
    var date = new Date();
    var year = new Date(date.getFullYear(), 0, 1);
    var days = Math.ceil((date - year) / (24 * 60 * 60 * 1000));
    var week = Math.ceil(days / 7);

    postSaleJewel(jewel, week, date.getDate(), date.getMonth(), date.getFullYear())
    deleteJewel(jewel.jewelId)
}

export function saleOtherJewel(jewel, quantity, actualQuantity) {
    var date = new Date();
    var year = new Date(date.getFullYear(), 0, 1);
    var days = Math.ceil((date - year) / (24 * 60 * 60 * 1000));
    var week = Math.ceil(days / 7);

    console.log(days, week)

    let x = 0
    while (x < quantity) {
        postSaleJewel(jewel, week, date.getDate(), date.getMonth(), date.getFullYear())
        x++
    }
    deleteOtherJewel(jewel.id, actualQuantity)
}

export function restoreJewel(jewel, option) {
    if (option == "borrar") {
        saleToInventory(jewel)
        deleteSaleJewel(jewel.id)
    }
    else {
        saleToInventory(jewel)
    }
}

export function saleToInventory(jewel) {
    if (jewel.jewelId == null) {
        console.log(jewel.jewelId)
    }
    else {
        let id = 0
        let isJewel = []
        getJewelJewelId(jewel.jewelId).then((j) => {
            isJewel.concat(j)
        })
        if (isJewel.length != 0) {
            id = jewel.jewelId
        }
        else {
            const range = JEWELSID[jewel.jewelType]
            getJewelId(range).then((ids) => {
                id = parseInt(getAviableId(ids, range)[0])
            })
        }
        console.log(jewel, id)
        //postJewel(jewel.jewelType, id, jeweljewel.description, jewel.gold, jewel.weight, jewel.price, jewel.note)
    }

}

export async function transformImportJewels() {
    const data = require('../../data/Joyas.json');
    
    data.Argolla.map( (argolla) => {
        if(argolla.Descripcion != undefined){
            postJewel("Argolla", argolla.id, argolla.Descripcion, argolla.Oro, argolla.Peso, argolla.Precio, "")
        }
    })
    data.Sortija.map( (anillo) => {
        if(anillo.Descripcion != undefined){
            postJewel("Anillo", anillo.id, anillo.Descripcion, anillo.Oro, anillo.Peso, anillo.Precio, "")
        }
    })
    data.Pulso.map( (pulso) => {
        if(pulso.Descripcion != undefined){
            postJewel("Pulso", pulso.Id, pulso.Descripcion, pulso.Oro, pulso.Peso, pulso.Precio, "")
        }
    })
    data.Cadena.map( (cadena) => {
        if(cadena.Descripcion != undefined){
            postJewel("Cadena", cadena.id, cadena.Descripcion, cadena.Oro, cadena.Peso, cadena.Precio, "")
        }
    })
    data.Dije.map( (dije) => {
        if(dije.Descripcion != undefined){
            postJewel("Dije", dije.id, dije.Descripcion, dije.Oro, dije.Peso, dije.Precio, "")
        }
    })
}

export function exportJewels() {

}

export async function deleteJewels() {
    deleteJewelsT()
    deleteOthersJewelT()
    deleteSalesT()
    initDatabase()
}
