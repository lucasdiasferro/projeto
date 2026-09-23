import { create } from 'zustand';

// Definimos o formato da nossa Transação
export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense'; // income = receita, expense = despesa
  time: string;
};

// Definimos o que a nossa "caixa d'água" vai guardar
type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (description: string, amount: number, type: 'income' | 'expense') => void;
};

// Criamos a Store
export const useTransactions = create<TransactionStore>((set) => ({
  transactions: [], // Começa com uma lista vazia

  addTransaction: (description, amount, type) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(), // Gera um ID aleatório simples
      description,
      amount,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Pega a hora atual
    };

    // Atualiza a lista colocando a nova transação no topo
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
  },
}));