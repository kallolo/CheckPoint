import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView,YellowBox, Animated, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, Button, List } from 'react-native-paper';
import { LocationContext } from '../contexts/LocationContext';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ])

const InputLokasi = () => {
    const {state ,clearLocationStart, getLocation, saveLocation, removeLocation} = useContext(LocationContext);
    const [lokasi, setLokasi] = useState('');
    const [dataLokasi, setDataLokasi] = useState([]);

    let longitude;
    let latitude;
    let labelButton;
    if(state.locationStart ==""){
        longitude   ="";
        latitude    ="";
        labelButton ="Ambil Koordinat";
    }else{
        longitude   = state.locationStart.coords.longitude.toString();
        latitude    = state.locationStart.coords.latitude.toString();
        labelButton ="Ganti Koordinat";
    }

    const getDataLokasi = async() =>{
        let Lokasi = await AsyncStorage.getItem('Lokasi');
        setDataLokasi(JSON.parse(Lokasi));
        // console.log(Lokasi)
    }
    
    const listDataLokasi = (item) =>{
        // console.log(item)
        return(
        <Swipeable
        renderRightActions={(progress, dragX) => {
          const scale = dragX.interpolate({
            inputRange: [-50, 0],
            outputRange: [0.9, 0]
          })
          return (<>
            <TouchableOpacity onPress={()=>removeLocation(item.location)} style={{justifyContent:'center'}}>
                <Animated.View style={{ backgroundColor: 'red', justifyContent: 'center' , paddingVertical:30,transform: [{ scale }]}}>
                <Icon style={{paddingHorizontal:10}} name='ios-trash-outline' size={30} color="white"/>
              </Animated.View>
            </TouchableOpacity>
            </>
          )}}
          containerStyle={{backgroundColor:"#e0e0e0"}}>

        <List.Item
            title={item.location}
            description={"long : "+item.longitude+", lat :"+item.latitude}
            left={props => <List.Icon {...props} icon="map-marker-radius" color="green"/>}
            style={{borderBottomWidth:2, borderBottomColor:'grey'}}
          />
        </Swipeable>
        )
    }

    useEffect(()=>{
        getDataLokasi()
        return () => clearLocationStart();
    },[])
    

    return (
        <View style={{margin:20, flex:1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View>
                <TextInput value={lokasi} label="Nama Lokasi" mode="outlined" style={{marginBottom:20}} onChangeText={(e)=>setLokasi(e)}/>
                <Button style={{marginBottom:20}} color="orange" icon="pin" mode="contained" onPress={() => getLocation()}>{labelButton}</Button>
                <TextInput label="longitude" mode="outlined" style={{marginBottom:20}} value={longitude} disabled={true}/>
                <TextInput label="latitude" mode="outlined" style={{marginBottom:20}} value={latitude} disabled={true}/>
                <Button disabled={state.locationStart ==""?true : false } style={{marginBottom:20}} color="green" icon="check" mode="contained" onPress={() => saveLocation(lokasi, longitude, latitude)}>Simpan</Button>
            </View>
            
            <View style={{marginTop:20}}>
                <ScrollView  style={{height:240}} >
                    <FlatList
                    data={dataLokasi}
                    renderItem={({item}) => listDataLokasi(item)}
                    keyExtractor={(item,index) => index.toString()}
                    />
                </ScrollView>
            </View>
          </ScrollView>   
            
        </View>
    );
}

InputLokasi.navigationOptions ={
    title :"Input Lokasi"
  }
 
 
export default InputLokasi;