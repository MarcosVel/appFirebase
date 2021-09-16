import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Listagem({ data }) {
  return (
    <View style={ styles.container }>
      <View style={ styles.containerText }>
        <Text style={ styles.texto }>Nome: { data.nome }</Text>
        <Text style={ styles.texto }>Cargo: { data.cargo }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#2A2E43',
    shadowOpacity: .29,
    elevation: 6
  },
  containerText: {
    paddingHorizontal: 5,
  },
  texto: {
    fontSize: 17
  }
})
