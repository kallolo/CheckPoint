import React from 'react';
import { DefaultTheme, configureFonts, Provider as PaperProvider } from 'react-native-paper';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthContextProvider from './src/contexts/AuthContext';
import CheckpointContextProvider from './src/contexts/CheckpointContext';
import LocationContextProvider from './src/contexts/LocationContext';
import MasterLokasiContextProvider from './src/contexts/MasterLokasiContext';
import { setNavigator } from './src/navigationRef';
import CaraPenggunaan from './src/screens/CaraPenggunaan';
import Cek from './src/screens/Cek';
import CekLogin from './src/screens/CekLogin';
import CheckPoint from './src/screens/CheckPoint';
import Contoh from './src/screens/Contoh';
import DetailListCheckpoint from './src/screens/DetailListCheckpoint';
import Home from './src/screens/Home';
import InputLokasi from './src/screens/InputLokasi';
import ListCheckpoint from './src/screens/ListCheckpoint';
import Login from './src/screens/Login';
import MasterLokasi from './src/screens/MasterLokasi';
import RiwayatCheckpoint from './src/screens/RiwayatCheckpoint';
import TambahLokasi from './src/screens/TambahLokasi';
import TampilPeta from './src/screens/TampilPeta';
import UbahLokasi from './src/screens/UbahLokasi';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  fonts : configureFonts(fontConfig),
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
  MasterLokasi: MasterLokasi,
  TambahLokasi: TambahLokasi,
  UbahLokasi: UbahLokasi,
  CheckPoint: CheckPoint,
  ListCheckpoint: ListCheckpoint,
  DetailListCheckpoint: DetailListCheckpoint,
  RiwayatCheckpoint: RiwayatCheckpoint,
  TampilPeta: TampilPeta,
  CaraPenggunaan : CaraPenggunaan,
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
            <MasterLokasiContextProvider>
              <AppContainer ref={(navigator) => setNavigator(navigator)} />
            </MasterLokasiContextProvider>
          </CheckpointContextProvider>
        </LocationContextProvider>
      </AuthContextProvider>
    </PaperProvider>
  )
}
