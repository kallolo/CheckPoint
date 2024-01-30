import React, {useContext} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const {Login, viewPassword, stateAuth} = useContext(AuthContext);
  // console.log(stateAuth)
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007acc" />
      <LoginForm
        onSubmit={Login}
        viewPassword={viewPassword}
        stateAuth={stateAuth}
      />
    </View>
  );
};

Login.navigationOptions = {
  header: () => false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007acc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
