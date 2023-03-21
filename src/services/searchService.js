export function getAviableId(ids, range){
    
    let v = range[0]
    let aviableIds = []

    for (let x in ids){
        if(ids[x].jewelId == v){
            v += 1
        }
        else{
            while(v < ids[x].jewelId){
                aviableIds.push(v)
                v +=1
                if(aviableIds.length >= 3){
                    break
                }
            }
            v+=1
        }
        if(aviableIds.length >= 3){
            break
        }
    }
    return aviableIds
}


export function saleJewel(jewelId){

}

