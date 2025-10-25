import Spline from '@splinetool/react-spline';
import { CreditCard } from 'lucide-react';

export default function HeroCover({ totalSpent = 0 }) {
  return (
    <section className="relative w-full h-[72vh] sm:h-[78vh]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/40 to-neutral-950 pointer-events-none" />

      <div className="relative h-full flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
              <CreditCard className="w-4 h-4 text-white/90" />
              <span className="text-xs tracking-wide text-white/80">Fintech Expense Tracker</span>
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Track your money with clarity and control
            </h1>
            <p className="mt-4 text-white/80 max-w-xl">
              A minimalist dashboard for everyday spending. Add transactions, visualize categories, and stay on top of your budget.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-md">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-white/60">Total Spent</div>
                <div className="mt-1 text-2xl font-semibold">${totalSpent.toFixed(2)}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-white/60">Status</div>
                <div className="mt-1 text-2xl font-semibold">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
