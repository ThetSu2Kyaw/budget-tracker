import { useState } from "react";
import { Transaction } from "@/types";
import { useTransactions } from "@/context/TransactionContext";

export default function BudgetProgress({ transactions }: { transactions: Transaction[] }) {
  const { monthlyBudget, setMonthlyBudget } = useTransactions();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(monthlyBudget || ""));

  const now = new Date();
  const currentMonthExpenses = transactions
    .filter((t) => {
      if (t.type !== "expense") return false;
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const percentage = monthlyBudget > 0 ? (currentMonthExpenses / monthlyBudget) * 100 : 0;
  const isOverBudget = percentage > 100;

  const handleSave = () => {
    const val = parseFloat(inputValue);
    if (!isNaN(val) && val > 0) {
      setMonthlyBudget(val);
    }
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Monthly Budget</h2>
        {!editing ? (
          <button
            onClick={() => { setInputValue(String(monthlyBudget || "")); setEditing(true); }}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150"
          >
            {monthlyBudget > 0 ? "Edit" : "Set budget"}
          </button>
        ) : null}
      </div>

      {editing ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-150"
              placeholder="e.g. 2000.00"
              autoFocus
            />
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 shadow-sm"
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors duration-150"
          >
            Cancel
          </button>
        </div>
      ) : monthlyBudget > 0 ? (
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">
              <span className="font-medium text-gray-700">${currentMonthExpenses.toLocaleString()}</span> spent of <span className="font-medium text-gray-700">${monthlyBudget.toLocaleString()}</span>
            </span>
            <span className={`font-semibold tabular-nums ${isOverBudget ? "text-red-600" : "text-gray-600"}`}>
              {percentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isOverBudget ? "bg-red-500" : percentage > 80 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          {isOverBudget && (
            <p className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Overspent by ${(currentMonthExpenses - monthlyBudget).toLocaleString()}!
            </p>
          )}
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="text-sm text-gray-400">No budget set for this month.</p>
        </div>
      )}
    </div>
  );
}
