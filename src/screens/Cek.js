import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { LocationContext } from '../contexts/LocationContext';
import { Button } from 'react-native-paper';
const Cek = () => {
    const {state , getLocation, getLocationUpdates, ClearState,updatesEnabled , setUpdatesEnabled} = useContext(LocationContext);

     useEffect(()=>{
        updatesEnabled ? getLocationUpdates() : ClearState();
        return () =>ClearState();
     }, [updatesEnabled])

    return (
    <View style={{margin:20}}>
        <View style={{flexDirection:'row', marginBottom:10}}>
            <View style={{flex:1}}><Text style={{fontWeight:"bold"}}>Koordinat Mulai</Text></View>
            <View style={{flex:2}}><Text>: {JSON.stringify(state.locationStart.coords, null, 4)}</Text></View>
        </View>
        <View style={{flexDirection:'row', marginBottom:10}}>
            <View style={{flex:1}}><Text style={{fontWeight:"bold"}}>Koordinat Sekarang</Text></View>
            <View style={{flex:2}}><Text>: {JSON.stringify(state.locationCurrent.coords, null, 4)}</Text></View>
        </View>
        <View style={{flexDirection:'row', marginTop:30}}>
            <View style={{flex:1}}><Button color="orange" icon="pin" mode="contained" onPress={() => getLocation()}>Lokasi Mulai</Button></View>
            <View style={{flex:1}}>{updatesEnabled ? 
            <Button color="red" icon="close" mode="contained" onPress={() => setUpdatesEnabled(false)}>stop</Button>
            :<View style={{flex:1}}><Button color="green" icon="check" mode="contained" onPress={() => setUpdatesEnabled(true)}>Start</Button></View>
        }</View>
        </View>
    </View>
    );
}

Cek.navigationOptions ={
    title :"Cek Koordinat"
  }
 
export default Cek;