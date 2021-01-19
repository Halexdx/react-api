import React, { useState, useEffect } from 'react';
import { View, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import Api from '../services/api';


import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [photoType, setPhotoType] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then( user => {
      if(user) {
        navigation.navigate('List');
      }
    })
  }, []);

  async function handleSubmit() {
    const responde = await Api.post('/sessions', {
      email
    })

    const { _id } = responde.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('phototype', photoType);

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView enable={Platform.OS == "ios"} behavior="padding" style={styles.container}>
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>TIPO DE ENSAIO * <Text style={styles.labelSpan}>(Digite até 3 tipos)</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Ensaios do seu interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={photoType}
          onChangeText={setPhotoType}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar Ensaios</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  labelSpan: {
    fontWeight: 'normal',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor:'#BB5D4C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});