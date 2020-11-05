import React, { useContext, useEffect, useState } from 'react';
import {ScrollView, Text, View, Image } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import { LocationContext } from '../contexts/LocationContext';
import { MasterLokasiContext } from '../contexts/MasterLokasiContext';
import { CheckpointContext } from '../contexts/CheckpointContext';

const CheckPoint = () => {
    const {state, CekRadius, StopLocationUpdates} = useContext(LocationContext);
    const {stateML, getMasterLokasi} = useContext(MasterLokasiContext);
    const {kirimCheckpoint} = useContext(CheckpointContext);
    const [dataLokasi, setDataLokasi] = useState([]);
    const [selectedLokasi, setSelectedLokasi] = useState('')
    const [lokasiCheckpoint, setLokasiCheckpoint] = useState('');
    const [idLokasi, setIdLokasi] = useState('');
    const [photo, setPhoto ] = useState('');
    const [keteranganCheckpoint, setKeteranganCheckpoint] = useState('')
    const [shiftCheckpoint, setShiftCheckpoint] = useState('1');


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
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <View style={{flex:1}}><Text style={{fontWeight:"bold"}}>Radius (3 Meter)</Text></View>
                    <View style={{flex:2}}><Text>: {!state.radius ? "Belum ": "Sudah"}</Text></View>
                </View>
                
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <RadioButton.Group onValueChange={value => setShiftCheckpoint(value)} value={shiftCheckpoint}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Shift 1</Text>
                                <RadioButton value="1" color="#007acc" />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Shift 2</Text>
                                <RadioButton value="2" color="#007acc" />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontWeight: 'bold' }}>Shift 3</Text>
                                <RadioButton value="3" color="#007acc" />
                            </View>
                        </RadioButton.Group>
                        {/* <TextInput style={{ fontSize: 20, color: '#c5e9fd', padding: 10 }} placeholder="Cari Relasi" value={1} onChangeText={(Shift) => console.log({ Shift })} /> */}
            </View>

            <View style={{flexDirection:'row', marginBottom:10}}>
                <TextInput
                    mode="outlined"
                    multiline={true}
                    style={{ flex: 1 }}
                    label="Keterangan"
                    value={keteranganCheckpoint}
                    onChangeText={value => setKeteranganCheckpoint(value)}
                />
                </View>
            <View style={{ alignItems:'center'}}>
                {photo == "" ? <Text>Foto Belum Ada</Text>:(
            <Image
                style={{width: 350, height: 350,}}
                source={{uri: photo.response.uri}}
            />
            )}
            </View>
            
            <Button disabled={!state.radius ? true : false} color="green" icon="camera" mode="contained" onPress={() => ImagePicker.launchCamera(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 500,
                maxWidth: 500,
              },
              (response) => {
                  if(response.didCancel){
                      console.log('batal pilih gambar')
                    //   setPhoto("");
                  }else{
                    setPhoto({response})
                  }
                 
                // console.log({response});
              },
            )} contentStyle={{padding:20}} style={{marginTop:20, borderRadius:10}}>{photo == "" ? "Ambil Foto" : "Ganti Foto"}</Button>
            {/* <Text>{JSON.stringify(respon.response.uri)}</Text>  */}
          
            <Button color="green" icon="check" mode="contained" onPress={() => kirimCheckpoint(photo, idLokasi, keteranganCheckpoint, shiftCheckpoint)} disabled={photo==="" ? true : false} 
             contentStyle={{padding:20}} style={{marginTop:20, borderRadius:10}}>Check Point</Button>
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