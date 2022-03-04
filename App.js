import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import api from './src/services/api';

const App = () => {
  const cepInput = useRef();

  const [cep, setCep] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    alert('Digite o CEP para receber os dados detalhados');
  }, []);

  function limpaCep() {
    setCep('');
    setResult(null);
    cepInput.current.focus();
  }

  async function buscar() {
    if (cep.length !== 8) {
      alert('Informe um CEP válido');
      setCep('');
      return;
    }
    try {
      const result = await api.get(`${cep}`);
      setResult(result.data);
      Keyboard.dismiss();
    } catch (err) {
      if (result === null) {
        alert('CEP não encontrado');
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textoTitulo}>Digite o CEP para buscar</Text>
      <TextInput
        style={styles.cepInput}
        placeholder="Ex. 35900798"
        ref={cepInput}
        onChangeText={texto => setCep(texto)}
        maxLength={8}
        value={cep}
        keyboardType="number-pad"
      />
      <View style={styles.buttonsView}>
        <TouchableOpacity
          style={[styles.buttonOpacity, {backgroundColor: '#1d75cd'}]}
          onPress={buscar}>
          <Text style={styles.textButton}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonOpacity, {backgroundColor: '#bd330d'}]}
          onPress={limpaCep}>
          <Text style={styles.textButton}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {result && (
        <View style={styles.resultView}>
          <Text style={styles.resultTextPlaceholder}>
            CEP: <Text style={styles.resultText}>{result.cep}</Text>
          </Text>
          <Text style={styles.resultTextPlaceholder}>
            UF: <Text style={styles.resultText}>{result.state}</Text>
          </Text>
          <Text style={styles.resultTextPlaceholder}>
            Cidade: <Text style={styles.resultText}>{result.city}</Text>
          </Text>
          <Text style={styles.resultTextPlaceholder}>
            Bairro: <Text style={styles.resultText}>{result.neighborhood}</Text>
          </Text>
          <Text style={styles.resultTextPlaceholder}>
            Logradouro: <Text style={styles.resultText}>{result.street}</Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  textoTitulo: {
    fontSize: 22,
    marginBottom: 10,
  },
  cepInput: {
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    padding: 10,
    marginBottom: 20,
  },
  buttonsView: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonOpacity: {
    height: '100%',
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
  },
  resultView: {
    width: '100%',
    alignItems: 'center',
  },
  resultTextPlaceholder: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'normal',
  },
});

export default App;
