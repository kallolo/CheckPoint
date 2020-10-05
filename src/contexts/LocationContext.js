import React, { createContext, useReducer, useState } from 'react';
import { Alert,ToastAndroid, Linking, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';
import { locationReducer } from '../reducers/locationReducer';
import {getDistance , isPointWithinRadius} from 'geolib';
import { navigate } from '../navigationRef';

export const LocationContext = createContext()

const LocationContextProvider = (props) => {
    let watchId = null;
    const initialState = {
        isLoading       : false,
        locationStart   : "", // lokasi mulai
        locationCurrent : "", //lokasi sekarang
        jarak           : "",
        radius          : false,
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
        let lokasiTujuan;
        let jarak;
    
        if (!cekLocationPermission) {
          return;
        }
          watchId = Geolocation.watchPosition(
            (position) => {
                dispatch({type:'setLocationCurrent', data :position})
                // jarak
                jarak = getDistance(position.coords, state.locationStart.coords);
                console.log('Jarak '+jarak+' Meter')
                dispatch({type:'setJarak', data :jarak})

                //radius
                radius = isPointWithinRadius(position.coords, state.locationStart.coords, 5);
                console.log(radius)
                dispatch({type:'setRadius', data :radius})

                console.log(position);
            },
            (error) => {
              console.log(error);
            },
            {
              enableHighAccuracy: true,
              distanceFilter: 0,
              interval: 1000,
              fastestInterval: 500,
            },
          );
        
      };
    const removeLocationUpdates = () => {
        if (watchId !== null) {
          Geolocation.clearWatch(watchId);
          watchId = null;
        }
      };
    
    const StopLocationUpdates = () => {
        dispatch({type:'stopUpdateLocation'})
        removeLocationUpdates()
    }

    const clearLocationStart = () =>{
      dispatch({type:'clearLocationStart'})
    }

    const saveLocation = async(lokasi, longitude, latitude) =>{
      const data = {
        location  : lokasi,
        longitude : parseFloat(longitude),
        latitude  : parseFloat(latitude)
      }
      let dataLokasi =[];
      let Lokasi = await AsyncStorage.getItem('Lokasi');
      if(Lokasi !== null){
        dataLokasi = JSON.parse(Lokasi);
      }
      dataLokasi.push(data)
      await AsyncStorage.setItem('Lokasi', JSON.stringify(dataLokasi));
      navigate('Home')
    }

    return (
        <LocationContext.Provider value={{state, dispatch, updatesEnabled , setUpdatesEnabled,StopLocationUpdates, clearLocationStart, getLocation, getLocationUpdates,removeLocationUpdates, saveLocation}}>
            {props.children}
        </LocationContext.Provider>
    );
}
 
export default LocationContextProvider;