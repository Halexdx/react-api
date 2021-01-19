import React, {useState, useEffect} from  'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet , FlatList, Image, TouchableOpacity} from 'react-native';
import Api  from '../services/api';

function PhotoShootList({ phototype , navigation}) {
  const [photoshoots, setPhotoShoots] = useState([]);
  useEffect(() => {
    async function loadPhotoShoot(){
      const response = await Api.get('/photoshoots', {
        params: { phototype }
      })
      setPhotoShoots(response.data);
    }

    loadPhotoShoot();
  }, []);

  function handleNavigate(id){
    navigation.navigate('Book', { id });
  }

   return ( 
    <View style={styles.container}>
      <Text style={styles.title}> Ensaios que contêm <Text style={styles.bold}>{phototype}</Text> </Text>
      <FlatList 
        style={styles.list}
        data={photoshoots}
        keyExtractor={ photoshoots => photoshoots._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri:item.thumbnail_url.replace("localhost","192.168.0.6") }} />
            <Text style={styles.photoshoot}>{ item.photoshoot }</Text>
            <Text style={styles.packs}> <Text style={styles.packsStrong}>Pacote:</Text> { item.packs.toString() }</Text>
            <Text style={styles.price}>{ item.price ? `R$${item.price}` : `A combinar`}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
   )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },

  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },

  bold : {
    fontWeight: 'bold'
  },

  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    marginRight: 15,
  },

  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  photoshoot: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10
  },

  packs: {
    width: 200,
    fontSize: 15,
    color: '#999',
    marginTop: 5
  },

  packsStrong: {
    fontWeight: 'bold',
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 5
  },

  button: {
    height: 32,
    backgroundColor:'#BB5D4C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default withNavigation(PhotoShootList);