import React, { useState,useEffect } from 'react';
import {FlatList, TouchableOpacity,View,Text} from 'react-native';

import {citiesStyle} from '../styles';

const Cities=(props)=>{
    
    const renderCities=({item})=><
        // Bu kısmı sor. Böyle yazında hatalı çalışıyor. onPress={props.onSelect(item)}
        TouchableOpacity style={citiesStyle.city} onPress={()=>props.onSelect(item)} >
            <Text>{item}</Text>
        </TouchableOpacity>
        
    return(
        <View>
            <FlatList
                keyExtractor={(_,index)=>index.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={props.cities}
                renderItem={renderCities}
            />
        </View>
    )
}
export {Cities}