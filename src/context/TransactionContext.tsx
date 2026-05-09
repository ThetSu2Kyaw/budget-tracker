import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Transaction } from "@/types";

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  monthlyBudget: number;
  setMonthlyBudget: (amount: number) => void;
};

const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
    const budget = localStorage.getItem("monthlyBudget");
    if (budget) {
      setMonthlyBudget(parseFloat(budget));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("monthlyBudget", String(monthlyBudget));
    }
  }, [monthlyBudget, loaded]);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      { ...t, id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) },
      ...prev,
    ]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, monthlyBudget, setMonthlyBudget }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
}
