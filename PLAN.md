# Budget Tracker — Implementation Plan

## Context
A personal budget tracker web app where users can add expenses and income by category, view expenses grouped by category, and see a dashboard with totals (expense, income, balance). Data is persisted in localStorage — no backend needed.

## Tech Stack
- **Next.js 12** (Pages Router) with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for simple dashboard charts
- **localStorage** for data persistence (via a custom hook with Context)

## Data Model

```ts
type Transaction = {
  id: string;
  type: "expense" | "income";
  amount: number;
  category: string;
  description: string;
  date: string; // ISO date
};

const EXPENSE_CATEGORIES = ["Food", "Transport", "Housing", "Entertainment", "Shopping", "Utilities", "Healthcare", "Other"];
const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment", "Gift", "Other"];
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Dashboard — summary cards + recent transactions |
| `/transactions` | Full transaction list with category filter |

## Components

```
Layout (nav + container)
├── DashboardPage (/)
│   ├── SummaryCards (total income, total expense, balance)
│   ├── BudgetProgress (monthly budget limit + progress bar)
│   ├── ExpenseByCategoryChart (pie/bar chart via Recharts)
│   └── RecentTransactions (last 5, links to /transactions)
├── TransactionsPage (/transactions)
│   ├── TransactionForm (add new — inline)
│   ├── CategoryFilter (buttons)
│   └── TransactionList (filtered, with delete)
└── Shared
    ├── TransactionItem (single row)
```

## Data Flow

1. `TransactionContext` wraps the app — provides `transactions`, `addTransaction`, `deleteTransaction`, `monthlyBudget`, `setMonthlyBudget`
2. On mount, context hydrates from localStorage
3. Every add/delete/budget change writes back to localStorage
4. Dashboard and Transactions pages consume context

## Files Created

```
budget_tracker/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── src/
│   ├── pages/
│   │   ├── _app.tsx          # Layout with nav + TransactionProvider
│   │   ├── index.tsx          # Dashboard
│   │   └── transactions.tsx   # Transactions list + form
│   ├── components/
│   │   ├── SummaryCards.tsx
│   │   ├── BudgetProgress.tsx
│   │   ├── ExpenseByCategoryChart.tsx
│   │   ├── RecentTransactions.tsx
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionList.tsx
│   │   ├── TransactionItem.tsx
│   │   └── CategoryFilter.tsx
│   ├── context/
│   │   └── TransactionContext.tsx
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
```

## Verification
1. `npm run dev` — app should start without errors
2. Add an expense via the form → should appear in the list and update dashboard totals
3. Add an income → balance should reflect income minus expenses
4. Set a monthly budget → progress bar should track current month's expenses
5. Exceed budget → progress bar turns red with overspend message
6. Filter by category on `/transactions` → list should filter
7. Refresh the page → data should persist (localStorage)
8. Delete a transaction → totals should update
