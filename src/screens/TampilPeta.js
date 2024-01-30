import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const TampilPeta = () => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      showsUserLocation={true}
      region={{
        latitude: -0.5054328,
        longitude: 103.382809,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      }}></MapView>
  );
};
TampilPeta.navigationOptions = {
  title: 'Tampil Peta',
};
export default TampilPeta;
