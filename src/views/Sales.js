import React, { useState } from 'react';
import {ScrollView, Text, View, FlatList} from 'react-native';
import style from '../styles/style';
import listStyle from '../styles/listStyle';
import ListItem from '../components/ListItem'


function Sales({navigation}){


    return (
        <ScrollView horizontal={false} style={{ width: "100%" }}>
            
            <View style={listStyle.viewList}>
                {
                    jewelSales.map((item) => {
                        if(item.description != "") return <ListItem key={item.id} jewel={item} navigation={navigation}/>
                    })
                }
            </View>

        </ScrollView>
    );
  }
  
  export default Sales;