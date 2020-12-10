import React, { useContext, useEffect, useState } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';
import { navigate } from '../navigationRef';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { stateAuth, LogOut } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [sapa, setSapa] = useState('');
  let Privileges = stateAuth.detailUser.userPrivilegesGroupId;
  let date = new Date();
  let jam = date.getHours();

  useEffect(() => {
    var admin = Privileges.match(/PG-AdminCheckpoint/g)
    var user = Privileges.match(/PG-UserCheckpoint/g)
    if (admin !== null) {
      setIsAdmin(true);
    }
    if(user !== null){
      setIsUser(true);
    }

    //set sapaan 
    if(jam>0 && jam<9){
      setSapa("Selamat pagi")
      }
      else if(jam>=0 && jam<9){
      setSapa("Selamat pagi")
      }
      else if(jam>=9 && jam<16){
      setSapa("Selamat siang")
      }
      else if(jam>=16 && jam<18){
      setSapa("Selamat sore")
      }
      else if(jam>=18 && jam<24){
      setSapa("Selamat malam")
      }
  })

  return (<>
   <StatusBar backgroundColor="#007acc" />
  <View style={{height:120, backgroundColor:'#007acc', alignItems:'center'}}>
    <Text style={{color:'white', fontSize:30, fontWeight:'bold', paddingTop:20 , fontFamily:'sans-serif-light'}}>Aplikasi Checkpoint</Text>
  </View>
  <View style={{backgroundColor:'white', marginTop:-35, borderTopRightRadius:40, borderTopLeftRadius:40}}>
    <View style={{marginVertical:20, marginHorizontal:30, flexDirection:'row', justifyContent:'center'}}>
    <Text style={{fontSize:25, fontStyle:'italic', color:"#007acc"}}>{sapa} </Text><Text style={{fontSize:25, fontWeight:'bold', fontStyle:'italic',color:"#007acc"}}>{stateAuth.username}</Text>
    </View>
  
    <View style={{ marginHorizontal: 30, marginTop:10}}>
      {
        isAdmin ?
          (<>
            {/* <Button style={{ margin: 10 }} contentStyle={{ margin: 10 }} color="#007acc" icon="pencil" mode="contained" onPress={() => navigate('InputLokasi')}>Input Lokasi</Button> */}
            <Button style={{ margin: 10, borderRadius:10 }} contentStyle={{ marginVertical: 25 }} color="#007acc" icon="map-marker-radius" mode="contained" onPress={() => navigate('MasterLokasi')}>Master Lokasi</Button>
            <Button style={{ margin: 10, borderRadius:10 }} contentStyle={{ marginVertical: 25 }} color="#007acc" icon="check" mode="contained" onPress={() => navigate('CheckPoint')}>Checkpoint</Button>
            <Button style={{ margin: 10, borderRadius:10 }} contentStyle={{ marginVertical: 25 }} color="#007acc" icon="format-list-checkbox" mode="contained" onPress={() => navigate('ListCheckpoint')}>List Checkpoint</Button>
          </>)
          : 
          isUser ?  (<>
            <Button style={{ margin: 10, borderRadius:10 }} contentStyle={{ marginVertical: 25 }} color="#007acc" icon="check" mode="contained" onPress={() => navigate('CheckPoint')}>Checkpoint</Button>
            <Button style={{ margin: 10, borderRadius:10 }} contentStyle={{ marginVertical: 25 }} color="#007acc" icon="format-list-checkbox" mode="contained" onPress={() => navigate('RiwayatCheckpoint')}>Riwayat Checkpoint</Button>
          </>)
          : // tidak ada akses
          <Text style={{color:'red', textAlign:'center'}}>Tidak Ada Akses Menu</Text>
      }

      <Button style={{ margin: 10, borderRadius:10 }} contentStyle={{ margin: 10 }} color="red" icon="logout" mode="contained" onPress={() => {
        Alert.alert('Info', 'Apakah anda yakin keluar ?',
          [
            { text: 'Yakin', onPress: () => LogOut() },
            { text: 'Tidak', onPress: () => console.log('Klik Kembali'), style: 'cancel' }
          ])
        }}>LogOut</Button>
    </View>
    </View></>);
}

Home.navigationOptions = {
  header: null,
}

export default Home;