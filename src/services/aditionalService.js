import { deleteJewel, postSaleJewel } from './jewelService' 


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


export function saleJewel(jewel){
    var date = new Date();
    var year =  new Date(date.getFullYear(), 0, 1);
    var days =  Math.ceil((date - year) / (24 * 60 * 60 * 1000));
    var week = Math.ceil(days / 7);

    postSaleJewel(jewel, week, date.getDate(), date.getMonth(), date.getFullYear())
    deleteJewel(jewel.jewelId)
}



