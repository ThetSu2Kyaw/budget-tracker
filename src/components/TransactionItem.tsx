import { Transaction } from "@/types";
import { useTransactions } from "@/context/TransactionContext";

export default function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { deleteTransaction } = useTransactions();

  return (
    <div className="flex items-center justify-between py-3 px-1 rounded-lg hover:bg-gray-50/80 transition-colors duration-150 group">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-offset-1 ${
            transaction.type === "income"
              ? "bg-green-500 ring-green-200"
              : "bg-red-500 ring-red-200"
          }`}
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{transaction.description}</p>
          <p className="text-xs text-gray-400">
            {transaction.category} &middot; {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
        <span
          className={`text-sm font-semibold tabular-nums ${
            transaction.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}$
          {transaction.amount.toLocaleString()}
        </span>
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors duration-150 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label={`Delete ${transaction.description}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
