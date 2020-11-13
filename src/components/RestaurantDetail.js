import React from 'react';
import {Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {restaurantDetailstyle} from '../styles';
const RestaurantDetail=(props)=>{
    return(
            <Modal 
                isVisible={props.isVisible}
                onBackdropPress={props.onBackdropPress}
                swipeDirection="down"
                onSwipeComplete={props.onClose}
                >
                <View style={restaurantDetailstyle.modalStyle} >
                    <Image style={restaurantDetailstyle.img} source={{uri:props.restaurant.image_url}}></Image>
                    <Text style={restaurantDetailstyle.name}>{props.restaurant.name}</Text>
                    <Text style={restaurantDetailstyle.text}>{props.restaurant.city}</Text>
                    <Text style={restaurantDetailstyle.text}>{props.restaurant.address}</Text>
                    <Text style={restaurantDetailstyle.text}>{props.restaurant.phone}</Text>
                </View>
            </Modal>
    )
}
export {RestaurantDetail}