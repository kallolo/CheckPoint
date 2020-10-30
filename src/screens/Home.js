import React, { useContext, useEffect, useState } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';
import { navigate } from '../navigationRef';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const {stateAuth, LogOut } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false)
  let Privileges = stateAuth.detailUser.userPrivilegesGroupId;

  useEffect(()=>{
    var admin = Privileges.match(/PG-superUser/g)
    if(admin !== null){
      setIsAdmin(true);
    }
  })

  return (
    <View style={{ margin: 30 }}>
      <StatusBar backgroundColor="#007acc" />
      {
      isAdmin ?
      (<>
      <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="#007acc" icon="pencil" mode="contained" onPress={() => navigate('InputLokasi')}>Input Lokasi</Button>
         <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="#007acc" icon="format-list-checkbox" mode="contained" onPress={() => navigate('ListCheckpoint')}>List Checkpoint</Button>
      </>)
      :(<>
      <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="#007acc" icon="check" mode="contained" onPress={() => navigate('CheckPoint')}>Check Point</Button>
      <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="#007acc" icon="format-list-checkbox" mode="contained" onPress={() => navigate('RiwayatCheckpoint')}>Riwayat Checkpoint</Button>
      </>)
      }
      
      <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="red" icon="logout" mode="contained" onPress={() => {
        Alert.alert('Info', 'Apakah anda yakin keluar ?',
          [
            { text: 'Yakin', onPress: () => LogOut() },
            { text: 'Tidak', onPress: () => console.log('Klik Kembali'), style: 'cancel' }
          ])
      }}>LogOut</Button>
    </View>);
}

Home.navigationOptions = {
  header: null,
}

export default Home;