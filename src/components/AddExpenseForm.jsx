import { useMemo, useState } from 'react';
import { PlusCircle, Calendar, Tag, DollarSign } from 'lucide-react';

const DEFAULT_CATEGORIES = ['Food', 'Transport', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Travel', 'Other'];

export default function AddExpenseForm({ onAdd }) {
  const today = useMemo(() => new Date().toISOString().slice(0,10), []);
  const [form, setForm] = useState({ description: '', amount: '', category: 'Food', date: today });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Description required';
    const amountNum = Number(form.amount);
    if (!form.amount || isNaN(amountNum) || amountNum <= 0) e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Select a date';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onAdd({
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });
    setForm((f) => ({ ...f, description: '', amount: '' }));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Add Expense</h3>
      <p className="text-sm text-neutral-400 mb-4">Quickly log a transaction to keep your tracker up-to-date.</p>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Description</label>
          <input
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="e.g., Grocery run"
            className="w-full bg-neutral-800/80 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1">Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-neutral-400" />
              </div>
              <input
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="0.00"
                inputMode="decimal"
                className="w-full bg-neutral-800/80 border border-neutral-700 rounded-md pl-9 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            {errors.amount && <p className="text-xs text-red-400 mt-1">{errors.amount}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="w-4 h-4 text-neutral-400" />
              </div>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full bg-neutral-800/80 border border-neutral-700 rounded-md pl-9 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                {DEFAULT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="w-4 h-4 text-neutral-400" />
              </div>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full bg-neutral-800/80 border border-neutral-700 rounded-md pl-9 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date}</p>}
          </div>
        </div>
        <button type="submit" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white px-4 py-2 rounded-md text-sm font-medium">
          <PlusCircle className="w-4 h-4" />
          Add Expense
        </button>
      </form>
    </div>
  );
}
