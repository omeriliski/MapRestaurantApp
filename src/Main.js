import React, { useState,useEffect,useRef } from 'react';
import {Modal, View} from 'react-native';
import {SearchBar,Cities,RestaurantDetail} from './components'
import {mainStyle,mapStyles} from './styles';
import Axios from 'axios'
import  Marker  from 'react-native-maps';
import  MapView  from 'react-native-maps';

let orginalList=[];

const Main = () => {
    const [CityList,setCityList]=useState([]);
    const [RestaurantList,setRestaurantList]=useState([]);
    const [ModalFlag, setModalFlag] = useState(false);
    const [selectedRest,setSelectedRest] = useState("");
    const mapRef=useRef(null);

    const fetchCities=async ()=>{
        const {data}=await Axios.get(`http://opentable.herokuapp.com/api/cities`)
        setCityList(data.cities);
        orginalList=[...data.cities];
    }
    const searchCity=(text)=>{
        setCityList(orginalList.filter(e=>e.toUpperCase().indexOf(text.toUpperCase()) > -1));
    }
    const searchRestaurants=async (city)=>{
        //bu da farklı bir yazım
        const {data:{restaurants:rest}}=await Axios.get(`http://opentable.herokuapp.com/api/restaurants?city=${city}`);
        setRestaurantList(rest);
        const restaurantsCoordinates = rest.map(res=>{
            return({
                latitude:res.lat,
                longitude:res.lng        
            })
        })
        mapRef.current.fitToCoordinates(restaurantsCoordinates); 
        
    }
    const viewRestaurantDetail=(restaurant)=>{
        setModalFlag(true);
        setSelectedRest(restaurant);
    }
    useEffect(()=>{
        fetchCities();
    },[])
    return(
        <View style={{flex:1}}>
            <MapView
                customMapStyle={mapStyles}
                ref={mapRef}
                style={{flex:1}}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}>
                {RestaurantList.map((r, index) => (
                    <MapView.Marker
                    onPress={()=>viewRestaurantDetail(r)}
                    key={index}
                    coordinate={{
                        latitude:r.lat,
                        longitude:r.lng,
                    }}
                    />
                ))}
            </MapView>
            <View style={mainStyle.container}>
                <SearchBar search={searchCity}/>
                {/* (item)=>searchRestaurants(item) !!! aşağıda bir parametre döndüğü için iki şekilde de yazabiliriz */}
                {/* parametre dönmüyorsa ()=>searchRestaurant şeklinde yazmak zorundayız */}
                <Cities cities={CityList} onSelect={(item)=>searchRestaurants(item)}/>
                <RestaurantDetail 
                    restaurant={selectedRest} 
                    isVisible={ModalFlag} 
                    onBackdropPress={()=>setModalFlag(false)}
                    onClose={()=>setModalFlag(false)}
                />
            </View>
        </View>
    )
}

export default Main;