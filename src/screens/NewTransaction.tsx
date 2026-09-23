import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTransactions } from '../store/useTransactions'; // Importamos a nossa store


export function NewTransaction({ navigation }: any) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense'); // Começa como despesa por padrão

  // Puxamos a função de adicionar da nossa store
  const addTransaction = useTransactions((state) => state.addTransaction);

 function handleSave() {
    // 1. Verifica se está vazio e mostra um aviso na tela
    if (!description || !amount) {
      Alert.alert('Ops!', 'Por favor, preencha a descrição e o valor.');
      return; 
    }

    // 2. Troca vírgula por ponto (caso você digite 50,00) e converte para número
    const amountNumber = parseFloat(amount.replace(',', '.')); 

    // 3. Verifica se o valor digitado é um número válido
    if (isNaN(amountNumber)) {
      Alert.alert('Erro', 'Digite um valor numérico válido.');
      return;
    }

    // 4. Salva no Zustand
    addTransaction(description, amountNumber, type);
    
    // 5. Volta para o Dashboard
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Registo</Text>

      <TextInput 
        style={styles.input}
        placeholder="Descrição (ex: Gasolina, Corrida Uber)"
        placeholderTextColor="#A8A8B3"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput 
        style={styles.input}
        placeholder="Valor (ex: 50.00)"
        placeholderTextColor="#A8A8B3"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Botões para escolher o Tipo */}
      <View style={styles.typeContainer}>
        <TouchableOpacity 
          style={[styles.typeButton, type === 'income' && styles.typeIncomeActive]} 
          onPress={() => setType('income')}
        >
          <Text style={styles.typeText}>Receita</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.typeButton, type === 'expense' && styles.typeExpenseActive]} 
          onPress={() => setType('expense')}
        >
          <Text style={styles.typeText}>Despesa</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Registo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214', padding: 24, justifyContent: 'center' },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: '#202024', color: '#FFF', padding: 16, borderRadius: 8, fontSize: 16, marginBottom: 16 },
  typeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  typeButton: { flex: 1, padding: 16, borderRadius: 8, backgroundColor: '#202024', alignItems: 'center', marginHorizontal: 4 },
  typeIncomeActive: { backgroundColor: '#04D361', opacity: 0.8 },
  typeExpenseActive: { backgroundColor: '#F75A68', opacity: 0.8 },
  typeText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  button: { backgroundColor: '#04D361', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#121214', fontSize: 16, fontWeight: 'bold' },
  cancelButton: { padding: 16, alignItems: 'center', marginTop: 8 },
  cancelButtonText: { color: '#F75A68', fontSize: 16, fontWeight: 'bold' }
});