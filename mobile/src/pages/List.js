import React, { useState, useEffect } from 'react';
import { SafeAreaView, AsyncStorage, TouchableOpacity, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import socketio from 'socket.io-client';
import PhotoShootList from '../components/PhotoShootList';


import logo from '../assets/logo.png';

export default function List({ navigation }) {
  const [photoType, setPhotoType] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then( user_id => {
      const socket = socketio('http://192.168.0.6:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva de ${booking.photoshoot.photoshoot} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      })
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('phototype').then(storagedPhotoType =>{
      const photoTypeArray = storagedPhotoType.split(',').map( photot => photot.trim());

      setPhotoType(photoTypeArray);
    })
  },[]);

  function handleLogout(){
    AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {photoType.map( photot => <PhotoShootList key={photot} phototype={photot} />)}
      </ScrollView>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },

  button: {
    height: 42,
    backgroundColor:'#6e6e6e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }

})