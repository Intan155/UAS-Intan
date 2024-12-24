import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ToastAndroid } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import CApi from '../lib/CApi';
import { useSelector, useDispatch } from 'react-redux';
import { setData, resetData } from '../store/reducer/Goreducer';
import React from 'react';

export default function Register() {
  const registerForm = useSelector((state) => state.login.loginInput);
  const dispatch = useDispatch();

  const goToJoinNow = () => {
    router.push('/JoinNow');
  };

  const onChangeValue = (payload) => {
    dispatch(setData({ ...registerForm, ...payload }));
  };

  const onSaveData = async () => {
    try {
      if (registerForm.password !== registerForm.confirm_password) {
        ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT);
        return;
      }

      const { data } = await CApi.post('/register', registerForm, {
        headers: { 'Content-Type': 'text/plain' },
      });

      ToastAndroid.show('Register Success', ToastAndroid.SHORT);

      dispatch(resetData());
      router.push('/login');
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/register.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleLine1}>Create</Text>
          <Text style={styles.titleLine2}>Account :)</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Email Id"
          placeholderTextColor="#F6F5F5"
          onChangeText={(val) => onChangeValue({ email: val })}
          value={registerForm.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Create Username"
          placeholderTextColor="#F6F5F5"
          onChangeText={(val) => onChangeValue({ username: val })}
          value={registerForm.username}
        />
        <TextInput
          style={styles.input}
          placeholder="Create Password"
          placeholderTextColor="#F6F5F5"
          secureTextEntry
          onChangeText={(val) => onChangeValue({ password: val })}
          value={registerForm.password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#F6F5F5"
          secureTextEntry
          onChangeText={(val) => onChangeValue({ confirm_password: val })}
          value={registerForm.confirm_password}
        />
        <TouchableOpacity onPress={onSaveData} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: 60,
    width: '100%',
  },
  titleLine1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  titleLine2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -5,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 18,
    color: '#000',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 90,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
