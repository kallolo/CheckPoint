import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthContextProvider from './src/contexts/AuthContext';
import CheckpointContextProvider from './src/contexts/CheckpointContext';
import LocationContextProvider from './src/contexts/LocationContext';
import { setNavigator } from './src/navigationRef';
import Cek from './src/screens/Cek';
import CekLogin from './src/screens/CekLogin';
import CheckPoint from './src/screens/CheckPoint';
import Contoh from './src/screens/Contoh';
import DetailListCheckpoint from './src/screens/DetailListCheckpoint';
import Home from './src/screens/Home';
import InputLokasi from './src/screens/InputLokasi';
import ListCheckpoint from './src/screens/ListCheckpoint';
import Login from './src/screens/Login';
import RiwayatCheckpoint from './src/screens/RiwayatCheckpoint';
import TampilPeta from './src/screens/TampilPeta';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3e9df9',
    accent: '#f1c40f',
  },
};
const NavAuth = createStackNavigator({ Login: Login })
const NavContent = createStackNavigator({
  Home: Home,
  Cek: Cek,
  InputLokasi: InputLokasi,
  CheckPoint: CheckPoint,
  ListCheckpoint: ListCheckpoint,
  DetailListCheckpoint: DetailListCheckpoint,
  RiwayatCheckpoint : RiwayatCheckpoint,
  TampilPeta: TampilPeta,
  Contoh: {
    screen: Contoh,
    navigationOptions: {
      title: 'Contoh',
    }
  },
});

const SwitchNavigator = createSwitchNavigator({
  CekLogin: CekLogin,
  Auth: NavAuth,
  Content: NavContent
});

const AppContainer = createAppContainer(SwitchNavigator);

export default () => {
  return (
    <PaperProvider theme={theme}>
      <AuthContextProvider>
        <LocationContextProvider>
          <CheckpointContextProvider>
            <AppContainer ref={(navigator) => setNavigator(navigator)} />
          </CheckpointContextProvider>
        </LocationContextProvider>
      </AuthContextProvider>
    </PaperProvider>
  )
}
