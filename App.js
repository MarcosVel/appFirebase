import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import firebase from './src/firebaseConnection';

function App() {
  const [ nome, setNome ] = useState('');
  const [ cargo, setCargo ] = useState('');

  useEffect(() => {
    async function dados() {

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

      alert('Cadastrado com sucesso!')
      setNome('');
      setCargo('');
    }
  }

  return (
    <View style={ styles.container }>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  texto: {
    fontSize: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 40,
    fontSize: 17
  },

});

export default App;
