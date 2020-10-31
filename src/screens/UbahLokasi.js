import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MasterLokasiContext } from '../contexts/MasterLokasiContext';

const UbahLokasi = ({ navigation }) => {
    const item = navigation.state.params.item;
    const { updateMasterLokasi } = useContext(MasterLokasiContext)
    const [namaLokasi, setNamaLokasi] = useState(item.namaLokasi);
    const [longitudeLokasi, setLongitudeLokasi] = useState(item.longitudeLokasi);
    const [latitudeLokasi, setLatitudeLokasi] = useState(item.latitudeLokasi);

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
            <Button style={{ marginVertical: 10, borderRadius: 10 }} contentStyle={{ paddingVertical: 10 }} color="green" icon="check" mode="contained" onPress={() => updateMasterLokasi(item.idLokasi, namaLokasi, longitudeLokasi, latitudeLokasi)}>Simpan</Button>
        </View>
    );
}

UbahLokasi.navigationOptions = {
    title: "Ubah Lokasi",
    headerStyle: {
        backgroundColor: '#007acc'
    },
    headerTintColor: '#FFFFFF',
}
export default UbahLokasi;