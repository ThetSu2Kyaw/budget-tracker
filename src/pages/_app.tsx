import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { TransactionProvider } from "@/context/TransactionContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <TransactionProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/" className="font-bolder text-2xl text-gray-900 tracking-tight mr-20 flex-shrink-0">
                Budget Tracker
              </Link>
              <div className="flex gap-3 items-center ml-4">
                <Link
                  href="/"
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${isActive("/")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/transactions"
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${isActive("/transactions")
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                >
                  Transactions
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Component {...pageProps} />
        </main>
      </div>
    </TransactionProvider>
  );
}
