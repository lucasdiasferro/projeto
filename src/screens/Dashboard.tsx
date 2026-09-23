import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTransactions } from '../store/useTransactions'; // Importamos a store

export function Dashboard({ navigation }: any) {
  // Puxamos a lista de transações da store
  const transactions = useTransactions((state) => state.transactions);

  // Calculamos os saldos automaticamente baseados na lista
  const incomes = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = incomes - expenses;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, Motoboy!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cartões Calculados Dinamicamente */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
          <View style={[styles.card, styles.cardHighlight]}>
            <Text style={styles.cardTitleHighlight}>Saldo do Dia</Text>
            <Text style={styles.cardValueHighlight}>R$ {balance.toFixed(2)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Receitas</Text>
            <Text style={styles.cardValue}>R$ {incomes.toFixed(2)}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Despesas</Text>
            <Text style={styles.cardValueExpense}>R$ {expenses.toFixed(2)}</Text>
          </View>
        </ScrollView>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Últimas Movimentações</Text>

          {/* Se não houver transações, mostra um aviso */}
          {transactions.length === 0 && (
            <Text style={styles.emptyText}>Nenhum registro ainda. Adicione no +</Text>
          )}

          {/* Mapeia a lista de transações e cria um item visual para cada uma */}
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionTitle}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>{transaction.time}</Text>
              </View>
              <Text style={transaction.type === 'income' ? styles.transactionIncome : styles.transactionExpense}>
                {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NewTransaction')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  greeting: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  logoutText: { color: '#A8A8B3', fontSize: 14 },
  cardsContainer: { paddingLeft: 20, marginBottom: 30 },
  card: { backgroundColor: '#202024', padding: 20, borderRadius: 8, marginRight: 16, width: 150 },
  cardHighlight: { backgroundColor: '#04D361' },
  cardTitle: { color: '#A8A8B3', fontSize: 14, marginBottom: 10 },
  cardTitleHighlight: { color: '#121214', fontSize: 14, marginBottom: 10 },
  cardValue: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  cardValueExpense: { color: '#F75A68', fontSize: 20, fontWeight: 'bold' },
  cardValueHighlight: { color: '#121214', fontSize: 20, fontWeight: 'bold' },
  transactionsSection: { paddingHorizontal: 20, paddingBottom: 80 },
  sectionTitle: { color: '#FFF', fontSize: 18, marginBottom: 16 },
  emptyText: { color: '#A8A8B3', textAlign: 'center', marginTop: 20 },
  transactionItem: { backgroundColor: '#202024', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 8, marginBottom: 12 },
  transactionTitle: { color: '#FFF', fontSize: 16 },
  transactionDate: { color: '#A8A8B3', fontSize: 12, marginTop: 4 },
  transactionIncome: { color: '#04D361', fontSize: 16, fontWeight: 'bold' },
  transactionExpense: { color: '#F75A68', fontSize: 16, fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#04D361', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  fabText: { color: '#121214', fontSize: 32, fontWeight: 'bold' }
});