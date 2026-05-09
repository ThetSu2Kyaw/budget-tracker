import { useTransactions } from "@/context/TransactionContext";
import SummaryCards from "@/components/SummaryCards";
import ExpenseByCategoryChart from "@/components/ExpenseByCategoryChart";
import RecentTransactions from "@/components/RecentTransactions";
import BudgetProgress from "@/components/BudgetProgress";

export default function Dashboard() {
  const { transactions } = useTransactions();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <SummaryCards transactions={transactions} />
      <BudgetProgress transactions={transactions} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseByCategoryChart transactions={transactions} />
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
}
