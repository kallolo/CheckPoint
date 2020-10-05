import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { LocationContext } from '../contexts/LocationContext';
import { Button } from 'react-native-paper';
const Cek = () => {
    const {state , getLocation, getLocationUpdates, StopLocationUpdates,updatesEnabled , setUpdatesEnabled} = useContext(LocationContext);

     useEffect(()=>{
        updatesEnabled ? getLocationUpdates() : StopLocationUpdates();
        return () =>StopLocationUpdates();
     }, [updatesEnabled])

    return (
    <View style={{margin:20}}>
        <View style={{flexDirection:'row', marginBottom:10}}>
            <View style={{flex:1}}><Text style={{fontWeight:"bold"}}>Koordinat Tujuan</Text></View>
            <View style={{flex:2}}><Text>: {JSON.stringify(state.locationStart, null, 4)}</Text></View>
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
        <View style={{flexDirection:'row', marginTop:30}}>
            <View style={{flex:1}}><Button color="orange" icon="pin" mode="contained" onPress={() => getLocation()}>Lokasi Tujuan</Button></View>
            <View style={{flex:1}}>{updatesEnabled ? 
            <Button color="red" icon="close" mode="contained" onPress={() => setUpdatesEnabled(false)}>stop</Button>
            :<View style={{flex:1}}><Button disabled={state.locationStart ==="" ? true : false} color="green" icon="check" mode="contained" onPress={() => setUpdatesEnabled(true)}>Start</Button></View>
        }</View>
        </View>
    </View>
    );
}

Cek.navigationOptions ={
    title :"Cek Koordinat"
  }
 
export default Cek;