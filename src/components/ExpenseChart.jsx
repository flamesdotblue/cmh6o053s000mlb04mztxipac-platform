import { PieChart } from 'lucide-react';

function getPalette(i) {
  const colors = [
    '#60a5fa', // blue-400
    '#34d399', // emerald-400
    '#f472b6', // pink-400
    '#f59e0b', // amber-500
    '#a78bfa', // violet-400
    '#22d3ee', // cyan-400
    '#fb7185', // rose-400
    '#f97316', // orange-500
  ];
  return colors[i % colors.length];
}

export default function ExpenseChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.total, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">By Category</h3>
        <span className="inline-flex items-center gap-2 text-sm text-neutral-400"><PieChart className="w-4 h-4" /> Distribution</span>
      </div>

      {data.length === 0 || total === 0 ? (
        <p className="text-sm text-neutral-400">No data yet.</p>
      ) : (
        <div>
          <div className="grid grid-cols-12 gap-2 items-end h-40 mt-4">
            {data.map((d, i) => {
              const pct = total === 0 ? 0 : d.total / total;
              const h = Math.max(6, Math.round(pct * 140));
              const color = getPalette(i);
              return (
                <div key={d.category} className="col-span-3 flex flex-col items-center">
                  <div
                    className="w-full rounded-t-md"
                    style={{ height: `${h}px`, backgroundColor: color, opacity: 0.9 }}
                    title={`${d.category}: $${d.total.toFixed(2)}`}
                  />
                  <div className="mt-2 text-center">
                    <div className="text-xs text-neutral-300 truncate max-w-[5rem]" title={d.category}>{d.category}</div>
                    <div className="text-[10px] text-neutral-400">${d.total.toFixed(0)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-xs text-neutral-400">Total: ${total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
