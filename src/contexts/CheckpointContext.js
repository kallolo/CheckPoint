import React, { createContext, useReducer } from 'react';
import APICheckpoint from '../api/APICheckpoint';
import AsyncStorage from '@react-native-community/async-storage';
import { checkpointReducer } from '../reducers/checkpointReducer';

export const CheckpointContext = createContext();

const CheckpointContextProvider = (props) => {
    const initialState = {
        isLoading: false,
        listCheckpoint: "", // list checkpoint
        detailCheckpoint: [], // detail list checkpoint
    }

    const [state, dispatch] = useReducer(checkpointReducer, initialState);

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
        <CheckpointContext.Provider value={{ state, dispatch, getCheckpoint, getDetailCheckpoint }}>
            {props.children}
        </CheckpointContext.Provider>
    )
}

export default CheckpointContextProvider;