import React from 'react';
import {TextInput, View} from 'react-native';
import {searchbarStyle} from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SearchBar=(props)=>{
    return(
        <View style={searchbarStyle.inputView}>
            <Icon name="magnify" size={20} color="grey"/>
            <TextInput onChangeText={(text)=>props.search(text)} placeholder="Enter a City..."/>
        </View>
    )
}
export {SearchBar}