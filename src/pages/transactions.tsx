import { useState, useMemo } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { TransactionType } from "@/types";
import TransactionForm from "@/components/TransactionForm";
import CategoryFilter from "@/components/CategoryFilter";
import TransactionList from "@/components/TransactionList";

export default function TransactionsPage() {
  const { transactions } = useTransactions();
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (categoryFilter && t.category !== categoryFilter) return false;
      return true;
    });
  }, [transactions, typeFilter, categoryFilter]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h1>

      <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6">
        <div>
          <TransactionForm />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => { setTypeFilter("all"); setCategoryFilter(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                typeFilter === "all" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => { setTypeFilter("expense"); setCategoryFilter(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                typeFilter === "expense" ? "bg-red-500 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => { setTypeFilter("income"); setCategoryFilter(""); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                typeFilter === "income" ? "bg-green-500 text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              Income
            </button>
          </div>

          {typeFilter !== "all" && (
            <div className="mb-4">
              <CategoryFilter
                selected={categoryFilter}
                onChange={setCategoryFilter}
                type={typeFilter}
              />
            </div>
          )}

          <TransactionList transactions={filtered} />
        </div>
      </div>
    </div>
  );
}
