import { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';

const DEFAULT_EXPENSES = [
  { id: crypto.randomUUID(), description: 'Groceries', amount: 54.23, category: 'Food', date: new Date().toISOString().slice(0,10) },
  { id: crypto.randomUUID(), description: 'Coffee', amount: 4.75, category: 'Food', date: new Date().toISOString().slice(0,10) },
  { id: crypto.randomUUID(), description: 'Subway', amount: 2.75, category: 'Transport', date: new Date().toISOString().slice(0,10) },
  { id: crypto.randomUUID(), description: 'Netflix', amount: 15.99, category: 'Entertainment', date: new Date().toISOString().slice(0,10) },
];

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState({ query: '', category: 'All' });

  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch {
        setExpenses(DEFAULT_EXPENSES);
      }
    } else {
      setExpenses(DEFAULT_EXPENSES);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (exp) => {
    setExpenses((prev) => [{ ...exp, id: crypto.randomUUID() }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const categories = useMemo(() => {
    const set = new Set(expenses.map((e) => e.category));
    return ['All', ...Array.from(set)];
  }, [expenses]);

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const catOk = filter.category === 'All' || e.category === filter.category;
      const q = filter.query.trim().toLowerCase();
      const qOk = !q || e.description.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [expenses, filter]);

  const totalsByCategory = useMemo(() => {
    const map = new Map();
    for (const e of expenses) {
      map.set(e.category, (map.get(e.category) || 0) + Number(e.amount));
    }
    return Array.from(map.entries()).map(([category, total]) => ({ category, total }));
  }, [expenses]);

  const totalSpent = useMemo(() => expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0), [expenses]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <HeroCover totalSpent={totalSpent} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 -mt-24 relative z-10">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-neutral-900/60 backdrop-blur rounded-xl border border-neutral-800 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold tracking-tight">Expenses</h2>
              <div className="flex gap-2">
                <input
                  value={filter.query}
                  onChange={(e) => setFilter((f) => ({ ...f, query: e.target.value }))}
                  placeholder="Search description or category"
                  className="bg-neutral-800/80 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
                <select
                  value={filter.category}
                  onChange={(e) => setFilter((f) => ({ ...f, category: e.target.value }))}
                  className="bg-neutral-800/80 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <ExpenseList expenses={filtered} onDelete={deleteExpense} />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-900/60 backdrop-blur rounded-xl border border-neutral-800 p-4 sm:p-6">
              <AddExpenseForm onAdd={addExpense} />
            </div>
            <div className="bg-neutral-900/60 backdrop-blur rounded-xl border border-neutral-800 p-4 sm:p-6">
              <ExpenseChart data={totalsByCategory} />
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-neutral-400">
        <p className="text-sm">Built for tracking expenses with a modern fintech aesthetic.</p>
      </footer>
    </div>
  );
}
