import { TransactionType, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/types";

type Props = {
  selected: string;
  onChange: (category: string) => void;
  type: TransactionType | "all";
};

export default function CategoryFilter({ selected, onChange, type }: Props) {
  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        onClick={() => onChange("")}
        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors duration-150 ${
          selected === "" ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors duration-150 ${
            selected === cat ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
