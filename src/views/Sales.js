import React, { useEffect, useState } from 'react';
import {ScrollView, Text, View, FlatList} from 'react-native';
import generalStyles from '../styles/generalStyles';
import listStyle from '../styles/listStyle';
import ListItemJewel from '../components/ListItemJewel'
import { getSaleJewel } from '../services/jewelService';


function Sales({navigation}){

    const [jewels, setJewels] = useState([])

    useEffect(() =>{
        getSaleJewel().then((jewels)=>{
            setJewels(jewels)
        })
    },[])

    return (
        <ScrollView horizontal={false} style={{ width: "100%" }}>
            
            <View style={listStyle.viewList}>
                {
                    jewels.map((item) => {
                        return <ListItemJewel key={item.id} jewel={item} navigation={navigation}/>
                    })
                }
            </View>

        </ScrollView>
    );
  }
  
  export default Sales;