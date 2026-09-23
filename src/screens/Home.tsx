import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moto Finance</Text>
      <Text style={styles.subtitle}>O seu controlo financeiro na pista.</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#04D361',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A8A8B3',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#04D361',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#121214',
    fontSize: 16,
    fontWeight: 'bold',
  }
});