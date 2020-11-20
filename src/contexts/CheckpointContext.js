import React, { createContext, useReducer } from 'react';
import APICheckpoint from '../api/APICheckpoint';
import AsyncStorage from '@react-native-community/async-storage';
import { checkpointReducer } from '../reducers/checkpointReducer';
import { Platform } from 'react-native';
import { navigate } from '../navigationRef';

export const CheckpointContext = createContext();

const CheckpointContextProvider = (props) => {
    const initialState = {
        isLoading: false,
        listCheckpoint: "", // list checkpoint
        detailCheckpoint: [], // detail list checkpoint
    }

    const [stateC, dispatch] = useReducer(checkpointReducer, initialState);

    const createFormData = (photo, body) => {
        const data = new FormData();
        // console.log(photo)
        data.append("fotoCheckpoint", {
            name : photo.fileName,
            type : photo.type,
            uri: Platform.OS ==="android" ? photo.uri : photo.uri.replace("file://", "")
        });

        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });

        return data;
    }

    const kirimCheckpoint = async(photo , idLokasi, keteranganCheckpoint) =>{
        // console.log(photo.response, idLokasi)
        dispatch({ type: 'loading' })
        const userLokal = await AsyncStorage.getItem('user');
        const userLogin = JSON.parse(userLokal);
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': userLogin.token,
            'username': userLogin.username,
        }

        const inputCheckpoint = await createFormData(photo.response, {idLokasi, keteranganCheckpoint})
        // console.log(JSON.parse(inputCheckpoint))
        try {
            const response = await APICheckpoint.post('/checkpoint', inputCheckpoint , { headers: header });
            dispatch({ type: 'stop-loading' })
            navigate('Home')
            // console.log(response);
        } catch (err) {
            console.log(err)
            console.log("upload error", error);
            alert("Upload failed!");
        }

    }

    const getCheckpoint = async (tanggal, shift) => {
        // console.log(tanggal, shift)
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
            const response = await APICheckpoint.get(`checkpoint/filter?shift=${shift}&tanggal=${tanggal}`, { headers: header });
            dispatch({ type: 'setListCheckpoint', data: response.data.data })
            // console.log(response.data.data);
        } catch (err) {
            console.log(err)
        }

    }

    const getDetailCheckpoint = async (tanggal, shift, by) => {
        dispatch({ type: 'loading' })
        try {
            const response = await APICheckpoint.get(`checkpoint/detail/${tanggal}/${shift}/${by}`);
            dispatch({ type: 'setDetailCheckpoint', data: response.data.data })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <CheckpointContext.Provider value={{ stateC, dispatch, kirimCheckpoint, getCheckpoint, getDetailCheckpoint }}>
            {props.children}
        </CheckpointContext.Provider>
    )
}

export default CheckpointContextProvider;