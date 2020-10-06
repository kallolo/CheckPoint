import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView,YellowBox } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput, Button } from 'react-native-paper';
import { LocationContext } from '../contexts/LocationContext';

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ])

const InputLokasi = () => {
    const {state ,clearLocationStart, getLocation, saveLocation} = useContext(LocationContext);
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
        <View style={{padding: 10,borderBottomWidth: 2,borderBottomColor: '#aaa'}}>
            <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                <View style={{flex:2}}>
                    <Text style={{fontWeight: 'bold',color: '#333',marginTop: 5,marginBottom: 3,fontSize: 16}}>{item.location}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{color: '#999'}}>{item.longitude}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{color: '#999'}}>{item.latitude}</Text>
                </View>
            </View>
            
          </View>
        )
    }

    useEffect(()=>{
        getDataLokasi()
        return () => clearLocationStart();
    },[])

    return (
        <View style={{margin:20, flex:1}}>
            <View>
                <TextInput value={lokasi} label="Nama Lokasi" mode="outlined" style={{marginBottom:20}} onChangeText={(e)=>setLokasi(e)}/>
                <Button style={{marginBottom:20}} color="orange" icon="pin" mode="contained" onPress={() => getLocation()}>{labelButton}</Button>
                <TextInput label="longitude" mode="outlined" style={{marginBottom:20}} value={longitude} disabled={true}/>
                <TextInput label="latitude" mode="outlined" style={{marginBottom:20}} value={latitude} disabled={true}/>
                <Button disabled={state.locationStart ==""?true : false } style={{marginBottom:20}} color="green" icon="check" mode="contained" onPress={() => saveLocation(lokasi, longitude, latitude)}>Simpan</Button>
            </View>
            
            <View style={{marginTop:20}}>
                <View style={{padding:10, flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
                    <View style={{flex:2}}>
                        <Text style={{fontWeight: 'bold',color: '#333',fontSize: 20}}>Lokasi</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight: 'bold',color: '#333',fontSize: 20}}>Long</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontWeight: 'bold',color: '#333',fontSize: 20}}>Lat</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{height:240}} >
                    <FlatList
                    data={dataLokasi}
                    renderItem={({item}) => listDataLokasi(item)}
                    keyExtractor={(item,index) => index.toString()}
                    />
                </ScrollView>
            </View>
            
            
        </View>
    );
}

InputLokasi.navigationOptions ={
    title :"Input Lokasi"
  }
 
 
export default InputLokasi;