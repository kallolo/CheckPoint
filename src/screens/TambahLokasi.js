import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MasterLokasiContext } from '../contexts/MasterLokasiContext';

const TambahLokasi = () => {
    const { addMasterLokasi } = useContext(MasterLokasiContext)
    const [namaLokasi, setNamaLokasi] = useState();
    const [longitudeLokasi, setLongitudeLokasi] = useState();
    const [latitudeLokasi, setLatitudeLokasi] = useState();

    return (
        <View style={{ margin: 15 }}>
            <TextInput
                style={{ marginBottom: 10 }}
                mode="outlined"
                label="Nama Lokasi"
                value={namaLokasi}
                onChangeText={value => setNamaLokasi(value)}
            />
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <TextInput
                    mode="outlined"
                    style={{ flex: 1 }}
                    label="Longitude"
                    value={longitudeLokasi}
                    onChangeText={value => setLongitudeLokasi(value)}
                />
                <TextInput
                    mode="outlined"
                    style={{ flex: 1 }}
                    label="Latitude"
                    value={latitudeLokasi}
                    onChangeText={value => setLatitudeLokasi(value)}
                />
            </View>
            <Button style={{ marginVertical: 10, borderRadius: 10 }} contentStyle={{ paddingVertical: 10 }} color="green" icon="check" mode="contained" onPress={() => addMasterLokasi(namaLokasi, longitudeLokasi, latitudeLokasi)}>Simpan</Button>
        </View>
    );
}

TambahLokasi.navigationOptions = {
    title: "Tambah Lokasi",
    headerStyle: {
        backgroundColor: '#007acc'
    },
    headerTintColor: '#FFFFFF',
}

export default TambahLokasi;