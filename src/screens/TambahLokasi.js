import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {LocationContext} from '../contexts/LocationContext';
import {MasterLokasiContext} from '../contexts/MasterLokasiContext';

const TambahLokasi = () => {
  const {stateML, addMasterLokasi} = useContext(MasterLokasiContext);
  const {state, getLocation} = useContext(LocationContext);
  const [namaLokasi, setNamaLokasi] = useState();

  let longitude;
  let latitude;
  let labelButton;
  if (state.locationStart == '') {
    longitude = '';
    latitude = '';
    labelButton = 'Ambil Koordinat';
  } else {
    longitude = state.locationStart.coords.longitude.toString();
    latitude = state.locationStart.coords.latitude.toString();
    labelButton = 'Ganti Koordinat';
  }

  return (
    <View style={{margin: 15}}>
      <TextInput
        style={{marginBottom: 10}}
        mode="outlined"
        label="Nama Lokasi"
        value={namaLokasi}
        onChangeText={(value) => setNamaLokasi(value)}
      />
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <TextInput
          mode="outlined"
          style={{flex: 1}}
          label="Longitude"
          value={longitude}
          disabled={true}
        />
        <TextInput
          mode="outlined"
          style={{flex: 1}}
          label="Latitude"
          value={latitude}
          disabled={true}
        />
      </View>
      <Button
        style={{marginBottom: 20}}
        color="orange"
        icon="pin"
        mode="contained"
        onPress={() => getLocation()}>
        {labelButton}
      </Button>
      <Button
        loading={stateML.isLoading}
        disabled={stateML.isLoading}
        style={{marginVertical: 10, borderRadius: 10}}
        contentStyle={{paddingVertical: 10}}
        color="green"
        icon="check"
        mode="contained"
        onPress={() => addMasterLokasi(namaLokasi, longitude, latitude)}>
        {stateML.isLoading ? 'Menyimpan..' : 'Simpan'}
      </Button>
    </View>
  );
};

TambahLokasi.navigationOptions = {
  title: 'Tambah Lokasi',
  headerStyle: {
    backgroundColor: '#007acc',
  },
  headerTintColor: '#FFFFFF',
};

export default TambahLokasi;
