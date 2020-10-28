import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';
import { navigate } from '../navigationRef';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { LogOut } = useContext(AuthContext);
  return (
    <View style={{ margin: 30 }}>
      <StatusBar backgroundColor="#007acc" />
      <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="#007acc" icon="pencil" mode="contained" onPress={() => navigate('InputLokasi')}>Input Lokasi</Button>
      <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="#007acc" icon="check" mode="contained" onPress={() => navigate('CheckPoint')}>Check Point</Button>
      <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="#007acc" icon="format-list-checkbox" mode="contained" onPress={() => navigate('ListCheckpoint')}>List Checkpoint</Button>
      <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="red" icon="logout" mode="contained" onPress={() => {
        Alert.alert('Info', 'Apakah anda yakin keluar ?',
          [
            { text: 'Yakin', onPress: () => LogOut() },
            { text: 'Tidak', onPress: () => console.log('Klik Kembali'), style: 'cancel' }
          ])
      }}>LogOut</Button>
      {/* <Button style={{margin:10}} contentStyle={{margin:10}} color="green" icon="pin" mode="contained" onPress={() => navigate('TampilPeta')}>TampilPeta</Button>
        <Button style={{margin:10}} contentStyle={{margin:10}} color="green" icon="pin" mode="contained" onPress={() => navigate('Cek')}>Cek Koordinat</Button> */}
    </View>);
}

Home.navigationOptions = {
  header: null,
}

export default Home;