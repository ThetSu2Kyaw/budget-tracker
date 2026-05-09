import { useState } from "react";
import { useTransactions } from "@/context/TransactionContext";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, TransactionType } from "@/types";

export default function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [description, setDescription] = useState("");

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    });

    setAmount("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">Add Transaction</h2>

      <div className="flex gap-3 mb-5">
        <button
          type="button"
          onClick={() => { setType("expense"); setCategory(EXPENSE_CATEGORIES[0]); }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 ${
            type === "expense"
              ? "bg-red-500 text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => { setType("income"); setCategory(INCOME_CATEGORIES[0]); }}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 ${
            type === "income"
              ? "bg-green-500 text-white shadow-sm"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          Income
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <input
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
            placeholder="e.g. Grocery shopping"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount ($)</label>
          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 shadow-sm"
        >
          Add {type === "expense" ? "Expense" : "Income"}
        </button>
      </div>
    </form>
  );
}
