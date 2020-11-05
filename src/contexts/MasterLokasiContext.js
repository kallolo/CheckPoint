import React, { createContext, useReducer } from 'react';
import APICheckpoint from '../api/APICheckpoint';
import AsyncStorage from '@react-native-community/async-storage';
import { masterLokasiReducer } from '../reducers/masterLokasiReducer';
import { navigate } from '../navigationRef';

export const MasterLokasiContext = createContext();

const MasterLokasiContextProvider = (props) => {
    const initialState = {
        isLoading: false,
        masterLokasi: []
    }

    const [stateML, dispatch] = useReducer(masterLokasiReducer, initialState);

    const getMasterLokasi = async () => {
        dispatch({ type: 'loading' })
        try {
            const response = await APICheckpoint.get(`/master-lokasi`);
            dispatch({ type: 'setMasterLokasi', data: response.data.data })
            // console.log(response.data.data);
        } catch (err) {
            console.log(err)
        }
    }

    const addMasterLokasi = async (namaLokasi, longitude, latitude) => {
        dispatch({ type: 'refresh' })
        dispatch({ type: 'loading' })
        const userLokal = await AsyncStorage.getItem('user');
        const userLogin = JSON.parse(userLokal);
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userLogin.token,
            'username': userLogin.username,
        }

        try {
            const response = await APICheckpoint.post('/master-lokasi', { namaLokasi, longitudeLokasi:longitude, latitudeLokasi :latitude}, { headers: header });
            navigate('MasterLokasi')
            console.log(response.data.data);
        } catch (err) {
            console.log(err)
        }

    }

    const updateMasterLokasi = async (idLokasi, namaLokasi, longitude, latitude) => {
        dispatch({ type: 'refresh' })
        dispatch({ type: 'loading' })
        const userLokal = await AsyncStorage.getItem('user');
        const userLogin = JSON.parse(userLokal);
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userLogin.token,
            'username': userLogin.username,
        }

        try {
            const response = await APICheckpoint.put('/master-lokasi', { idLokasi, namaLokasi, longitudeLokasi:longitude, latitudeLokasi :latitude }, { headers: header });
            navigate('MasterLokasi')
            console.log(response.data.data);
        } catch (err) {
            console.log(err)
        }

    }

    const deleteMasterLokasi = async (idLokasi) => {
        dispatch({ type: 'refresh' })
        dispatch({ type: 'loading' })
        const userLokal = await AsyncStorage.getItem('user');
        const userLogin = JSON.parse(userLokal);
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': userLogin.token,
            'username': userLogin.username,
        }

        try {
            const response = await APICheckpoint.delete(`/master-lokasi/${idLokasi}`, { headers: header });
            navigate('MasterLokasi')
            console.log(response.data.data);
        } catch (err) {
            console.log(err)
        }

    }

    const refresh = async () => {
        dispatch({ type: 'refresh' })
    }

    return (
        <MasterLokasiContext.Provider value={{ stateML, dispatch, refresh, getMasterLokasi, addMasterLokasi, updateMasterLokasi, deleteMasterLokasi }}>
            {props.children}
        </MasterLokasiContext.Provider>
    )
}

export default MasterLokasiContextProvider;