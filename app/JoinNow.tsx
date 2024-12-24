import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { router } from 'expo-router';

export default function JoinNow() {
  const goToLogin = () => {
    router.push('/login'); // Navigate to the Login page
  };

  return (
    <ImageBackground
      source={require('../assets/images/jn.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Text style={styles.titleLine1}>Let's Get</Text>
        <Text style={styles.titleLine2}>Started</Text>
        <Text style={styles.subtitle}>Grow Together</Text>
      </View>
      <TouchableOpacity onPress={goToLogin} style={styles.button}>
        <Text style={styles.buttonText}>JOIN NOW</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  titleLine1: {
    fontSize: 90,
    fontWeight: 'bold',
    color: '#000', // Changed to black
    textAlign: 'left',
  },
  titleLine2: {
    fontSize: 90,
    fontWeight: 'bold',
    color: '#000', // Changed to black
    textAlign: 'left',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#000', // Changed to black
    textAlign: 'left',
    marginBottom: 40, // Adjusted margin for spacing
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center', // Centering the button
    marginBottom: 40, // Space below the button
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
