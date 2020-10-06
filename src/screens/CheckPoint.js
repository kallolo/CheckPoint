import React, { useContext, useEffect, useState } from 'react';
import {Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import { Button } from 'react-native-paper';
import { LocationContext } from '../contexts/LocationContext';
const CheckPoint = () => {
    const {state, CekRadius, StopLocationUpdates} = useContext(LocationContext);
    const [dataLokasi, setDataLokasi] = useState([]);
    const [selectedLokasi, setSelectedLokasi] = useState('')

    const getDataLokasi = async() =>{
        let Lokasi = await AsyncStorage.getItem('Lokasi');
        setDataLokasi(JSON.parse(Lokasi));
        console.log(Lokasi)
    }

    useEffect(()=>{
        getDataLokasi();
    },[])

    useEffect(()=>{
        CekRadius(selectedLokasi)
        return ()=>StopLocationUpdates();
    },[selectedLokasi])

    return (
        <View style={{margin:20}}>
            <View style={{backgroundColor:"#999999", padding:5 , borderRadius:10}}>
            <Picker
                selectedValue={selectedLokasi}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                    // console.log(itemValue, itemIndex)
                    setSelectedLokasi(itemValue)
                }}
            >
                {dataLokasi.map((item,key) =>{
                    return <Picker.Item label={item.location} value={item} key={key} />
                })}
            </Picker>
            </View>

            {/* <Text>{JSON.stringify(selectedLokasi, null, 4)}</Text> */}
            <View style={{marginTop:20}}>
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <View style={{flex:1}}><Text style={{fontWeight:"bold"}}>Koordinat Tujuan</Text></View>
                    <View style={{flex:2}}><Text>: {JSON.stringify(selectedLokasi, null, 4)}</Text></View>
                </View>
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <View style={{flex:1}}><Text style={{fontWeight:"bold"}}>Koordinat Sekarang</Text></View>
                    <View style={{flex:2}}><Text>: {JSON.stringify(state.locationCurrent, null, 4)}</Text></View>
                </View>
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <View style={{flex:1}}><Text style={{fontWeight:"bold"}}>Jarak</Text></View>
                    <View style={{flex:2}}><Text>: {state.jarak !== "" ? state.jarak+" Meter" : "-"}</Text></View>
                </View>
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <View style={{flex:1}}><Text style={{fontWeight:"bold"}}>Radius (3 Meter)</Text></View>
                    <View style={{flex:2}}><Text>: {!state.radius ? "Belum ": "Sudah"}</Text></View>
                </View>
                <Button color="green" icon="check" mode="contained" onPress={() => console.log('CheckPoint')} disabled={!state.radius ? true : false} contentStyle={{padding:20}} style={{marginTop:20, borderRadius:10}}>Check Point</Button>
            </View>
           
        </View>
    );
}

CheckPoint.navigationOptions ={
    title :"Check Point"
  }
export default CheckPoint;