import React, {createContext, useReducer} from 'react';
import APICheckpoint from '../api/APICheckpoint';
import {authReducer} from '../reducers/authReducer';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../navigationRef';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const initialState = {
    isLoading: false,
    isAuthenticated: false,
    icon: 'ios-eye-off',
    SecurePassword: true,
    pesan: '',
    token: null,
    username: '',
    detailUser: '',
  };
  const [stateAuth, dispatch] = useReducer(authReducer, initialState);

  const viewPassword = () => {
    dispatch({type: 'lihatPassword'});
  };

  const CekToken = async () => {
    const userLokal = await AsyncStorage.getItem('user');
    const userLogin = JSON.parse(userLokal);
    // console.log(userLogin.token)
    if (userLogin) {
      // console.log(user)
      dispatch({
        type: 'loginBerhasil',
        data: {
          pesan: 'sudah login',
          status: true,
          token: userLogin.token,
          username: userLogin.username,
          detailUser: userLogin.detailUser,
        },
      });
      navigate('Content');
    } else {
      dispatch({
        type: 'loginGagal',
        data: {pesan: 'belum login, token tidak tersedia', status: false},
      });
      navigate('Auth');
    }
  };

  const Login = async ({username, password}) => {
    dispatch({type: 'loading'}); // loading
    try {
      const response = await APICheckpoint.post('/LoginSSO', {
        username,
        password,
      });
      console.log(response.data);
      const pesanLogin = response.data.pesan;
      if (pesanLogin === 'sukses') {
        var user = {
          username: response.data.username,
          token: response.data.token,
          detailUser: response.data.detailUser,
        };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch({
          type: 'loginBerhasil',
          data: {
            pesan: response.data.text_msg,
            status: true,
            token: response.data.token,
            username: response.data.username,
            detailUser: response.data.detailUser,
          },
        });
        navigate('Content');
      } else {
        setTimeout(() => {
          Alert.alert('Perhatian !!!', response.data.text_msg);
        }, 500);
        dispatch({
          type: 'loginGagal',
          data: {pesan: response.data.text_msg, status: false},
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const LogOut = async () => {
    await AsyncStorage.removeItem('user');
    dispatch({
      type: 'logout',
      data: {pesan: 'berhasil logout', status: false, token: null},
    });
    navigate('Auth');
  };

  return (
    <AuthContext.Provider
      value={{dispatch, stateAuth, viewPassword, Login, LogOut, CekToken}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
