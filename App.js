import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Keyboard, Platform, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import firebase from './src/firebaseConnection';
import Listagem from './src/Listagem';

function App() {
  const [ nome, setNome ] = useState('');
  const [ cargo, setCargo ] = useState('');
  const [ usuarios, setUsuarios ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function dados() {
      await firebase.database().ref('usuarios').on('value', (snapshot) => {
        // Para não renderizar toda lista novamente ao adicionar novo usuário
        setUsuarios([])

        snapshot.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
            cargo: childItem.val().cargo,
          }

          // Buscar cada usuário e acrescentar - .reverse() inverte a ordem
          setUsuarios(oldArray => [ ...oldArray, data ].reverse())
        })

        // Após a busca parar o loading
        setLoading(false)
        
      })
    }

    dados();
  }, [])

  async function cadastrar() {
    if (nome !== '' & cargo !== '') {
      let usuarios = await firebase.database().ref('usuarios');
      let chave = usuarios.push().key;

      usuarios.child(chave).set({
        nome: nome,
        cargo: cargo,
      });

      Keyboard.dismiss();
      setNome('');
      setCargo('');

      if (Platform.OS === 'android') {
        ToastAndroid.show('Cadastro realizado', ToastAndroid.SHORT)
      } else {
        alert('Cadastro realizado')
      }

    }
  }

  return (
    <View style={ styles.container }>
      <View style={ { paddingHorizontal: 10 } }>
        <Text style={ styles.texto }>Nome</Text>
        <TextInput
          style={ styles.input }
          underlineColorAndroid='transparent'
          value={ nome }
          onChangeText={ (texto) => setNome(texto) }
        />

        <Text style={ styles.texto }>Cargo</Text>
        <TextInput
          style={ styles.input }
          underlineColorAndroid='transparent'
          value={ cargo }
          onChangeText={ (texto) => setCargo(texto) }
        />

        <Button
          title="Novo funcionário"
          onPress={ cadastrar }
        />
      </View>

      <Text style={ [ styles.texto, { textAlign: 'center', marginTop: 20, marginBottom: 5 } ] }>Lista</Text>
      { loading ?
        (
          <ActivityIndicator color="#121212" size={ 45 } style={ { flex: 1 } } />
        ) : (
          <FlatList
            keyExtractor={ item => item.key }
            data={ usuarios }
            renderItem={ ({ item }) => (<Listagem data={ item } />) }
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={ { paddingBottom: 30 } }
          />
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginBottom: 0,
    backgroundColor: '#f4f6f8',
  },
  texto: {
    fontSize: 20,
    color: '#262738',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    fontSize: 17,
    elevation: 2
  },
});

export default App;
