import React, { useContext, useEffect, useState } from 'react';
import {ScrollView, Text, View, Image, Dimensions } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import { LocationContext } from '../contexts/LocationContext';
import { MasterLokasiContext } from '../contexts/MasterLokasiContext';
import { CheckpointContext } from '../contexts/CheckpointContext';
const { width, height} = Dimensions.get('window')

const CheckPoint = () => {
    const {state, CekRadius, StopLocationUpdates} = useContext(LocationContext);
    const {stateML, getMasterLokasi} = useContext(MasterLokasiContext);
    const {stateC,kirimCheckpoint} = useContext(CheckpointContext);
    const [selectedLokasi, setSelectedLokasi] = useState('')
    const [lokasiCheckpoint, setLokasiCheckpoint] = useState('');
    const [idLokasi, setIdLokasi] = useState('');
    const [keteranganCheckpoint, setKeteranganCheckpoint] = useState('')
    const [photos, setPhotos] = useState([])


    useEffect(()=>{
        getMasterLokasi();
    },[])

    useEffect(()=>{
        CekRadius(lokasiCheckpoint)
        pilihLokasi(selectedLokasi)
        return ()=>StopLocationUpdates();
    },[selectedLokasi])

    const pilihLokasi = (itemValue) =>{
        const lokasi = {
            namaLokasi : itemValue.namaLokasi,
            latitude : itemValue.latitudeLokasi,
            longitude : itemValue.longitudeLokasi
        }
        // console.log(lokasi),
        setLokasiCheckpoint(lokasi);
        setIdLokasi(itemValue.idLokasi);
        setSelectedLokasi(itemValue)
    }

    let fotoDinamis = photos.map((r, index) => {
        return(
        <View key={index} style={{ marginVertical: 5}}>
            <View style={{alignItems:'center' }}>
            <Image
                style={{height: 350 , width:width, }}
                source={{uri:r.response.uri}}
            />
            </View>
           <View style={{marginTop:-35}}>
           <Button color="red" icon="delete-empty" mode="contained" contentStyle={{padding:10}} style={{marginVertical:5, borderRadius:30}} onPress={()=>{
                photos.splice(index, 1)
                setPhotos(photos)
            }}>Hapus Foto</Button>
           </View>
        </View>
        )
    })
    return (<ScrollView showsVerticalScrollIndicator={false}>
        <View style={{margin:20}}>
            
            <View style={{borderColor:"#007acc" , borderWidth:2, padding:5 , borderRadius:10}}>
            {
                stateML.masterLokasi === null ? 
                <Text style={{color:'red' , fontSize:20, textAlign:'center'}}>Data Kosong</Text>
                :
                <Picker
                style={{borderColor:"#007acc" , borderWidth:2}}
                selectedValue={selectedLokasi}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) => {
                    // console.log(itemValue, itemIndex)
                    pilihLokasi(itemValue)
                }}>
                {stateML.masterLokasi.map((item,key) =>{
                    return <Picker.Item label={item.namaLokasi} value={item} key={key}/>
                })}
            </Picker>
            }
           
            </View>

            {/* <Text>{JSON.stringify(selectedLokasi, null, 4)}</Text> */}
            <View style={{marginTop:20 , paddingHorizontal:10}}>
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <View style={{flex:1}}><Text style={{fontWeight:"bold"}}>Jarak</Text></View>
                    <View style={{flex:2}}><Text>: {state.jarak !== "" ? state.jarak+" Meter" : "-"}</Text></View>
                </View>
               
                
            </View>
            {fotoDinamis}
            
            <Button disabled={stateC.isLoading || !state.radius ? true : false} color="green" icon="camera" mode="contained" onPress={() => ImagePicker.launchCamera(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 500,
                maxWidth: 500,
              },
              (response) => {
                  if(response.didCancel){
                      console.log('batal pilih gambar')
                  }else{
                    photos.push({response})
                    setPhotos(photos)
                  }
              },
            )} contentStyle={{padding:10}} style={{marginVertical:5, borderRadius:10}}>{photos == "" ? "Ambil Foto" : "Tambah Foto"}</Button>
        
            <View style={{flexDirection:'row', marginVertical:5}}>
                <TextInput
                    mode="outlined"
                    multiline={true}
                    style={{ flex: 1 }}
                    label="Keterangan"
                    value={keteranganCheckpoint}
                    onChangeText={value => setKeteranganCheckpoint(value)}
                />
                </View>
           
          
            <Button loading={stateC.isLoading} color="green" icon="check" mode="contained" onPress={() => kirimCheckpoint(photos, idLokasi, keteranganCheckpoint )}
            disabled={
                stateC.isLoading || photos==="" || !state.radius  ? true : false} 
             contentStyle={{padding:20}} style={{marginVertical:5, borderRadius:10}}>{stateC.isLoading ? "Mengirim .." : "Check Point"}</Button>
        </View>
        </ScrollView>
    );
}

CheckPoint.navigationOptions ={
    title :"Checkpoint",
    headerStyle: {
        backgroundColor: '#007acc'
    },
    headerTintColor: '#FFFFFF',
  }
export default CheckPoint;