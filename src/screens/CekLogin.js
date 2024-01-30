import React, {useEffect, useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {Text, View, Image, StatusBar} from 'react-native';

const CekLogin = () => {
  const {dispatch, stateAuth, CekToken} = useContext(AuthContext);
  useEffect(() => {
    dispatch({type: 'loading'}); // loading
    setTimeout(async () => {
      await CekToken();
    }, 2300);
  }, []);

  if (stateAuth.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar backgroundColor="transparent" />
        <View>
          <Image
            style={{
              marginTop: 20,
              height: 155,
              width: 178,
              resizeMode: 'stretch',
            }}
            source={require('../assets/img/logo-sambu.png')}
          />
        </View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#007acc',
            paddingBottom: 5,
          }}>
          Aplikasi Checkpoint
        </Text>
        <Text style={{fontSize: 20, color: '#007acc', paddingBottom: 20}}>
          PT.Pulau Sambu (Kuala Enok)
        </Text>
      </View>
    );
  }
  return null;
};

export default CekLogin;
