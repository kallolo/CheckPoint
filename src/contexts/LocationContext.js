import React, { createContext, useReducer, useState } from 'react';
import { Alert,ToastAndroid, Linking, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';
import { locationReducer } from '../reducers/locationReducer';

export const LocationContext = createContext()

const LocationContextProvider = (props) => {
    let watchId = null;
    const initialState = {
        isLoading       : false,
        locationStart   : {}, // lokasi mulai
        locationCurrent : {} //lokasi sekarang
    }
    const [updatesEnabled , setUpdatesEnabled] =  useState(false)
    const [state, dispatch] = useReducer(locationReducer, initialState);
    
    const hasLocationPermissionIOS = async () => {
        const openSetting = () => {
          Linking.openSettings().catch(() => {
            Alert.alert('Unable to open settings');
          });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');
    
        if (status === 'granted') {
          return true;
        }
    
        if (status === 'denied') {
          Alert.alert('Location permission denied');
        }
    
        if (status === 'disabled') {
          Alert.alert(
            `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
            '',
            [
              { text: 'Go to Settings', onPress: openSetting },
              { text: "Don't Use Location", onPress: () => {} },
            ],
          );
        }
    
        return false;
      };
    
    const hasLocationPermission = async() => {
        if (Platform.OS === 'ios') {
          const hasPermission = await hasLocationPermissionIOS();
          return hasPermission;
        }
    
        if (Platform.OS === 'android' && Platform.Version < 23) {
          return true;
        }
    
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    
        if (hasPermission) {
          return true;
        }
    
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }
    
        if (status === PermissionsAndroid.RESULTS.DENIED) {
          ToastAndroid.show(
            'Location permission denied by user.',
            ToastAndroid.LONG,
          );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          ToastAndroid.show(
            'Location permission revoked by user.',
            ToastAndroid.LONG,
          );
        }
    
        return false;
      };
    
    const getLocation = async() =>{
        const cekLocationPermission = await hasLocationPermission();
        console.log(cekLocationPermission)
        if (!cekLocationPermission) {
            return;
          }
          Geolocation.getCurrentPosition(
            (position) => {
               
                dispatch({type:'setLocationStart', data :position});
                console.log(position);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const getLocationUpdates = async () => {
        const cekLocationPermission = await hasLocationPermission();
    
        if (!cekLocationPermission) {
          return;
        }
          watchId = Geolocation.watchPosition(
            (position) => {
                dispatch({type:'setLocationCurrent', data :position})
                console.log(position);
            },
            (error) => {
              console.log(error);
            },
            {
              enableHighAccuracy: true,
              distanceFilter: 0,
              interval: 5000,
              fastestInterval: 2000,
            },
          );
        
      };
    const removeLocationUpdates = () => {
        if (watchId !== null) {
          Geolocation.clearWatch(watchId);
          watchId = null;
        }
      };
    
    const ClearState = () => {
        dispatch({type:'resetState' , initialState : initialState})
        removeLocationUpdates()
    }
    const Test = () =>{
        console.log('cek berhasil')
    }
    return (
        <LocationContext.Provider value={{state, dispatch, updatesEnabled , setUpdatesEnabled,ClearState, Test, getLocation, getLocationUpdates,removeLocationUpdates}}>
            {props.children}
        </LocationContext.Provider>
    );
}
 
export default LocationContextProvider;