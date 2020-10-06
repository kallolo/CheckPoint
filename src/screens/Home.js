import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { navigate } from '../navigationRef';

const Home = () => {
    return (
    <View style={{margin:30}}>
        <Button style={{margin:10}} contentStyle={{margin:10}} color="green" icon="pencil" mode="contained" onPress={() => navigate('InputLokasi')}>Input Lokasi</Button>
        <Button style={{margin:10}} contentStyle={{margin:10}} color="green" icon="check" mode="contained" onPress={() => navigate('CheckPoint')}>Check Point</Button>
        <Button style={{margin:10}} contentStyle={{margin:10}} color="green" icon="pin" mode="contained" onPress={() => navigate('Cek')}>Cek Koordinat</Button>
    </View>);
}

Home.navigationOptions ={
    header : null,
  }
 
export default Home;