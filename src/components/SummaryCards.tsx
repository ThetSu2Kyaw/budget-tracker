import { Transaction } from "@/types";

export default function SummaryCards({ transactions }: { transactions: Transaction[] }) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const cards = [
    { label: "Total Income", amount: totalIncome, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
    { label: "Total Expenses", amount: totalExpense, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
    { label: "Balance", amount: balance, color: balance >= 0 ? "text-blue-600" : "text-red-600", bg: "bg-blue-50", border: "border-blue-200" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.label} className={`${card.bg} ${card.border} border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{card.label}</p>
          <p className={`text-3xl font-bold ${card.color}`}>
            ${card.amount.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
