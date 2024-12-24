import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ToastAndroid } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import CApi from "@/lib/CApi";
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const goToSignUp = () => {
    router.push('/register'); // Navigate to the Sign Up page
  };
  const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const setVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

  const handleLogin = async () => {
    if (!email || !password) {
        ToastAndroid.show('Email and Password can’t be empty', ToastAndroid.SHORT);
        return;
    }

    try {
        const request = {
            email: email,
            password: password,
        };

        const { data } = await CApi.post('/login', request, {
            headers: { 'Content-Type': 'text/plain' }
        });

        console.log('Login berhasil:', data);
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userEmail', data.data.email);
        await AsyncStorage.setItem('userName', data.data.name);

        router.push('/dashboard');
    } catch (err) {
        console.log('Login gagal:', err);
        const msg = err?.response?.data?.message || 'Terjadi kesalahan';
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
};

  return (
    <ImageBackground
      source={require('../assets/images/login.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Enter Your Username & Password</Text>
        </View>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          placeholderTextColor="#999" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          placeholderTextColor="#999" 
          secureTextEntry 
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.linkContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgotten password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.createAccount}>or create a new account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

                            const styles = StyleSheet.create({
                              background: {
                                flex: 1,
                                justifyContent: 'center',
                              },
                              container: {
                                flex: 1,
                                justifyContent: 'center',
                                paddingHorizontal: 20,
                              },
                              textContainer: {
                                marginBottom: 40,
                                paddingHorizontal: '10%',
                              },
                              title: {
                                fontSize: 35,
                                fontWeight: 'bold',
                                color: '#000',
                                marginBottom: 10,
                              },
                              subtitle: {
                                fontSize: 18,
                                color: '#6B6B6B',
                                marginBottom: 70,
                              },
                              input: {
                                width: '80%',
                                borderBottomWidth: 2,
                                borderColor: '#000',
                                paddingVertical: 10,
                                marginBottom: 25,
                                fontSize: 24,
                                color: '#000',
                                alignSelf: 'center',
                              },
                              button: {
                                backgroundColor: '#000',
                                paddingVertical: 12,
                                paddingHorizontal: 80,
                                borderRadius: 30,
                                marginTop: 90,
                                marginBottom: 40,
                                alignSelf: 'center',
                              },
                              buttonText: {
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: 'bold',
                                textAlign: 'center',
                              },
                              linkContainer: {
                                alignItems: 'center',
                                marginTop: 5,
                              },
                              forgotPassword: {
                                fontSize: 14,
                                color: '#6B6B6B',
                                marginBottom: 5,
                              },
                              createAccount: {
                                fontSize: 14,
                                color: '#6B6B6B',
                              },
                            });
