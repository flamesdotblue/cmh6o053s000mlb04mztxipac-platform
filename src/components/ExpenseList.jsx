import { Trash2, Calendar } from 'lucide-react';

function formatCurrency(n) {
  const num = Number(n || 0);
  return `$${num.toFixed(2)}`;
}

export default function ExpenseList({ expenses, onDelete }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800">
      <table className="min-w-full divide-y divide-neutral-800">
        <thead className="bg-neutral-900/60">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">Amount</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-900/70 bg-neutral-950/50">
          {expenses.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-neutral-400">No expenses found. Add a new one to get started.</td>
            </tr>
          )}
          {expenses.map((e) => (
            <tr key={e.id} className="hover:bg-white/5 transition-colors">
              <td className="px-4 py-3">
                <div className="font-medium">{e.description}</div>
                <div className="text-xs text-neutral-400">ID: {e.id.slice(0,8)}</div>
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 text-xs">{e.category}</span>
              </td>
              <td className="px-4 py-3 text-neutral-300">
                <div className="inline-flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm">{e.date}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-right font-semibold">{formatCurrency(e.amount)}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onDelete(e.id)}
                  className="inline-flex items-center gap-2 text-red-300 hover:text-red-200 border border-red-500/20 hover:border-red-500/40 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-md text-xs"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
