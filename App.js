import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LocationContextProvider from './src/contexts/LocationContext';
import { setNavigator } from './src/navigationRef';
import Cek from './src/screens/Cek';
import CheckPoint from './src/screens/CheckPoint';
import Contoh from './src/screens/Contoh';
import Home from './src/screens/Home';
import InputLokasi from './src/screens/InputLokasi';
import TampilPeta from './src/screens/TampilPeta';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const NavContent = createStackNavigator({
  Home : Home,
  Cek : Cek,
  InputLokasi : InputLokasi,
  CheckPoint  : CheckPoint,
  TampilPeta  : TampilPeta,
  Contoh : {
    screen : Contoh,
    navigationOptions:{
      title: 'Contoh',
    }
  },
});

const SwitchNavigator = createSwitchNavigator({
  Content : NavContent
});

const AppContainer = createAppContainer(SwitchNavigator);

export default () => {
  return(
    <PaperProvider theme={theme}>
      <LocationContextProvider>
        <AppContainer ref={(navigator) => setNavigator(navigator)}/>
      </LocationContextProvider>
    </PaperProvider>
  )
}
