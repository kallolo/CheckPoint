import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const LoginForm = ({stateAuth, onSubmit, viewPassword}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: 'white',
          paddingBottom: 5,
        }}>
        Aplikasi Checkpoint
      </Text>
      <Text style={{fontSize: 20, color: 'white', paddingBottom: 20}}>
        PT.Pulau Sambu (Kuala Enok)
      </Text>
      <View style={styles.textSection}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
        />
        <Icon
          style={styles.textIcon}
          name="ios-person"
          size={20}
          color="gray"
        />
      </View>
      <View style={styles.textSection}>
        <TextInput
          style={styles.input}
          secureTextEntry={stateAuth.SecurePassword}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
        />
        <Icon
          style={styles.textIcon}
          name={stateAuth.icon}
          size={20}
          color="gray"
          onPress={() => viewPassword()}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onSubmit({username, password})}>
        <View>
          {stateAuth.isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}> LOGIN </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 300,
    color: '#1c313a',
    borderRadius: 10,
    marginVertical: 5,
    padding: 5,
    fontSize: 16,
    textAlign: 'left',
  },
  textIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 20,
    backgroundColor: '#fff',
    color: '#424242',
    fontFamily: 'serif',
  },
  button: {
    width: 300,
    backgroundColor: '#026daa',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
export default LoginForm;
