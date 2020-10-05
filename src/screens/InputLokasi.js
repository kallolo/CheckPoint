import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, Button } from 'react-native-paper';
import { LocationContext } from '../contexts/LocationContext';

const InputLokasi = () => {
    const {state ,clearLocationStart, getLocation, saveLocation} = useContext(LocationContext);
    const [lokasi, setLokasi] = useState('');

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
        console.log(Lokasi)
    }

    useEffect(()=>{
        getDataLokasi()
        return () => clearLocationStart();
    },[])

    return (
        <View style={{margin:20}}>
            <TextInput value={lokasi} label="Nama Lokasi" mode="outlined" style={{marginBottom:20}} onChangeText={(e)=>setLokasi(e)}/>
            <Button style={{marginBottom:20}} color="orange" icon="pin" mode="contained" onPress={() => getLocation()}>{labelButton}</Button>
            <TextInput label="longitude" mode="outlined" style={{marginBottom:20}} value={longitude} disabled={true}/>
            <TextInput label="latitude" mode="outlined" style={{marginBottom:20}} value={latitude} disabled={true}/>
            <Button disabled={state.locationStart ==""?true : false } style={{marginBottom:20}} color="green" icon="check" mode="contained" onPress={() => saveLocation(lokasi, longitude, latitude)}>Simpan</Button>
        </View>
    );
}

InputLokasi.navigationOptions ={
    title :"Input Lokasi"
  }
 
 
export default InputLokasi;