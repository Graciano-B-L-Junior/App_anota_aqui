import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import Body from './componentes/Body.js';

export default function App() {

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura)
      } catch (error) {

      }
    })();
  }, [])


  function atualizarTexto() {
    setarEstado('leitura')
    setData();
  }

  setData = async () => {
    try {
      await AsyncStorage.setItem('anotacao', anotacao)
      alert('Sua anotação foi salva')
    } catch (error) {

    }

  }

  if (estado == 'leitura') {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.header}><Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Aplicativo anotação</Text></View>
        {
          (anotacao != '')
            ?
            <View style={{ padding: 20 }}><Text>{anotacao}</Text></View>
            :
            <View style={{ padding: 20 }}><Text>Você tem nenhuma anotação</Text></View>
        }
        {
          (anotacao != "")
            ?
            <TouchableOpacity onPress={() => setarEstado('atualizando')} style={styles.btnAnotacao}>
              <Text style={{ fontSize: 13, color: 'white', textAlign: 'center', marginTop: 15 }}>Editar</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => setarEstado('atualizando')} style={styles.btnAnotacao}>
              <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
        }

      </View>
    )
  }
  else if (estado == 'atualizando') {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.header}><Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>Aplicativo anotação</Text></View>

        <TextInput autoFocus={true} onChangeText={(text) => setarAnotacao(text)} multiline={true} numberOfLines={5} value={anotacao} style={{ height: 300, padding: 20, textAlignVertical: 'top' }}></TextInput>

        <TouchableOpacity onPress={() => atualizarTexto()} style={styles.btnTextSalvar}><Text style={styles.btnText2}>Salvar</Text></TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#069'
  },
  anotacao: {
    fontSize: 13
  },
  btnAnotacao: {
    width: 50,
    height: 50,
    backgroundColor: '#069',
    borderRadius: 25,
    position: 'absolute',
    right: 15,
    bottom: 15
  },
  btnText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  },
  btnTextSalvar: {
    width: 100,
    padding: 20,
    backgroundColor: '#069',
    position: 'absolute',
    right: 15,
    bottom: 15,
    borderRadius: 40
  },
  btnText2: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white'
  }
});


