"use client";
import React, { useState } from 'react';

/* ── Budget constants ─────────────────────────────────────────────── */
const TOTAL_INCOME   = 2_860_000;
const TOTAL_EXPENSES = 2_703_490;
const UTILIDAD       = 156_510;
const COVERAGE_PCT   = ((TOTAL_INCOME / TOTAL_EXPENSES) * 100).toFixed(1);

const INCOME_ITEMS = [
  { label: 'Subvención Global',          amount: 850_000, pct: 30, color: '#2563eb' },
  { label: 'Golf 2025',                   amount: 600_000, pct: 21, color: '#7c3aed' },
  { label: 'Golf 2026',                   amount: 600_000, pct: 21, color: '#0891b2' },
  { label: 'HEB',                         amount: 550_000, pct: 19, color: '#dc2626' },
  { label: 'Patrocinadores Fundación TE', amount: 250_000, pct:  9, color: '#059669' },
  { label: 'Donaciones Golf QR',          amount:  10_000, pct:  0, color: '#d97706' },
];

const EXPENSE_CATEGORIES = [
  { label: 'CPCCM / Subvención Global',  amount: 1_250_000, color: '#1e3a5f' },
  { label: 'Laberinto TransformArte',    amount:   655_206, color: '#2563eb' },
  { label: 'Noches Rotarias',            amount:   600_000, color: '#7c3aed' },
  { label: 'Subasta Virtual',            amount:   108_500, color: '#d97706' },
  { label: 'PAZ – Esculturas',           amount:    89_784, color: '#059669' },
];

const LABERINTO_DETAIL = [
  { label: 'Transporte Gira',           amount: 250_000 },
  { label: 'Glicees / JuanJo',          amount: 239_443 },
  { label: 'Impresión Camión',          amount:  60_000 },
  { label: 'Monitores (×5)',            amount:  30_000 },
  { label: 'Trípies',                   amount:  30_000 },
  { label: 'Caballetes',                amount:  23_800 },
  { label: 'Aula TransformArte',        amount:  21_963 },
];

const NOCHES_DETAIL = [
  { label: 'Catering TAMPS / 5 ciudades', amount: 250_000 },
  { label: 'Cóctel Cierre / Cintermex',   amount: 250_000 },
  { label: 'Catering MTY / Valle Oriente', amount:  50_000 },
  { label: 'Catering SLP / Museo FFCC',   amount:  50_000 },
];

/* ── Helpers ──────────────────────────────────────────────────────── */
const mxn = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

/* ── Donut chart (pure SVG) ───────────────────────────────────────── */
function DonutChart({ items, total, cx = 90, r = 65, thickness = 22 }: {
  items: { label: string; amount: number; color: string }[];
  total: number; cx?: number; r?: number; thickness?: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const circ = 2 * Math.PI * r;
  let offset = -0.25 * circ; // start at top

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg width={cx * 2} height={cx * 2} viewBox={`0 0 ${cx * 2} ${cx * 2}`} className="flex-shrink-0">
        {/* background ring */}
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />
        {items.map((item, i) => {
          const pct  = item.amount / total;
          const dash = pct * circ;
          const gap  = circ - dash;
          const slice = (
            <circle
              key={i}
              cx={cx} cy={cx} r={r}
              fill="none"
              stroke={item.color}
              strokeWidth={hovered === i ? thickness + 4 : thickness}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              style={{ transition: 'stroke-width .15s', cursor: 'pointer' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          );
          offset += dash;
          return slice;
        })}
        {/* centre label */}
        <text x={cx} y={cx - 8} textAnchor="middle" className="fill-gray-900" fontSize="18" fontWeight="700">
          {mxn(total).replace('$', '$')}
        </text>
        <text x={cx} y={cx + 10} textAnchor="middle" className="fill-gray-400" fontSize="11">
          {hovered !== null ? items[hovered].label.split('/')[0].trim() : 'Total'}
        </text>
        {hovered !== null && (
          <text x={cx} y={cx + 24} textAnchor="middle" fill={items[hovered].color} fontSize="12" fontWeight="600">
            {((items[hovered].amount / total) * 100).toFixed(0)}%
          </text>
        )}
      </svg>

      {/* Legend */}
      <ul className="space-y-2 flex-1 min-w-0">
        {items.map((item, i) => (
          <li key={i}
            className={`flex items-center gap-2.5 text-sm rounded-lg px-2 py-1 transition-colors cursor-default ${hovered === i ? 'bg-gray-50' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}>
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="flex-1 text-gray-700 truncate">{item.label}</span>
            <span className="font-semibold text-gray-900 tabular-nums">{mxn(item.amount)}</span>
            <span className="text-gray-400 text-xs w-8 text-right">{((item.amount / total) * 100).toFixed(0)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Horizontal bar chart ─────────────────────────────────────────── */
function BarChart({ items }: { items: { label: string; amount: number; color: string }[] }) {
  const max = Math.max(...items.map(i => i.amount));
  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const pct = (item.amount / TOTAL_EXPENSES * 100).toFixed(1);
        const barW = (item.amount / max * 100).toFixed(1);
        return (
          <div key={i}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-gray-700 font-medium">{item.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{pct}%</span>
                <span className="text-sm font-semibold text-gray-900 tabular-nums w-32 text-right">{mxn(item.amount)}</span>
              </div>
            </div>
            <div className="w-full h-7 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className="h-full rounded-lg flex items-center px-3 transition-all duration-500"
                style={{ width: `${barW}%`, background: item.color }}
              >
                {Number(barW) > 15 && (
                  <span className="text-white text-xs font-semibold truncate">{item.label.split('/')[0].trim()}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Detail table ─────────────────────────────────────────────────── */
function DetailTable({ rows, total }: { rows: { label: string; amount: number }[]; total: number }) {
  return (
    <div className="mt-3 rounded-lg border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <tbody className="divide-y divide-gray-50">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-gray-50/60 transition-colors">
              <td className="px-4 py-2.5 text-gray-700">{r.label}</td>
              <td className="px-4 py-2.5 text-gray-400 text-xs text-right">{((r.amount / total) * 100).toFixed(1)}%</td>
              <td className="px-4 py-2.5 font-semibold text-gray-900 tabular-nums text-right">{mxn(r.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Collapsible section ──────────────────────────────────────────── */
function Collapsible({ title, color, amount, children }: { title: string; color: string; amount: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
        <span className="flex-1 font-medium text-gray-800">{title}</span>
        <span className="font-bold text-gray-900 tabular-nums">{mxn(amount)}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function FinanceTab({ locale }: { locale: string }) {
  const es = locale !== 'en';
  const t  = (s: string, e: string) => es ? s : e;

  return (
    <div className="space-y-8 max-w-5xl">

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-emerald-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">{t('Ingresos Totales', 'Total Income')}</p>
          <p className="text-2xl font-bold text-gray-900 tabular-nums">{mxn(TOTAL_INCOME)}</p>
          <p className="text-xs text-gray-400 mt-1">MXN · 2026–2027</p>
        </div>
        <div className="bg-white rounded-xl border border-red-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1">{t('Gastos Totales', 'Total Expenses')}</p>
          <p className="text-2xl font-bold text-gray-900 tabular-nums">{mxn(TOTAL_EXPENSES)}</p>
          <p className="text-xs text-gray-400 mt-1">MXN · {t('5 categorías', '5 categories')}</p>
        </div>
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{t('Utilidad', 'Net Profit')}</p>
          <p className="text-2xl font-bold text-emerald-600 tabular-nums">{mxn(UTILIDAD)}</p>
          <p className="text-xs text-gray-400 mt-1">5.5% {t('del presupuesto', 'of budget')}</p>
        </div>
        <div className="bg-white rounded-xl border border-violet-100 shadow-sm p-5">
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-1">{t('Cobertura', 'Coverage')}</p>
          <p className="text-2xl font-bold text-gray-900 tabular-nums">{COVERAGE_PCT}%</p>
          <p className="text-xs text-gray-400 mt-1">{t('Ingresos / Gastos', 'Income / Expenses')}</p>
        </div>
      </div>

      {/* Income & Expenses charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Donut — income */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
            {t('Fuentes de Ingreso', 'Income Sources')}
          </h2>
          <DonutChart items={INCOME_ITEMS} total={TOTAL_INCOME} />
        </div>

        {/* Bars — expenses */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
            {t('Distribución de Gastos', 'Expense Breakdown')}
          </h2>
          <BarChart items={EXPENSE_CATEGORIES} />
        </div>
      </div>

      {/* Budget utilization bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {t('Uso del Presupuesto', 'Budget Utilization')}
          </h2>
          <span className="text-sm font-semibold text-emerald-600">{COVERAGE_PCT}% {t('cubierto', 'funded')}</span>
        </div>
        <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden flex">
          {EXPENSE_CATEGORIES.map((cat, i) => (
            <div key={i} title={`${cat.label}: ${mxn(cat.amount)}`}
              className="h-full transition-all"
              style={{ width: `${(cat.amount / TOTAL_INCOME * 100).toFixed(2)}%`, background: cat.color }} />
          ))}
          {/* surplus */}
          <div className="h-full flex-1 bg-emerald-400" title={`Utilidad: ${mxn(UTILIDAD)}`} />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
          {EXPENSE_CATEGORIES.map((cat, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
              {cat.label.split('/')[0].trim()}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            {t('Utilidad', 'Profit')}
          </div>
        </div>
      </div>

      {/* Expense detail — collapsible */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          {t('Desglose por Categoría', 'Category Detail')}
        </h2>
        <div className="space-y-3">

          <Collapsible title={t('Laberinto TransformArte', 'Laberinto TransformArte')} color="#2563eb" amount={655_206}>
            <DetailTable rows={LABERINTO_DETAIL} total={655_206} />
          </Collapsible>

          <Collapsible title={t('Noches Rotarias', 'Rotary Nights')} color="#7c3aed" amount={600_000}>
            <DetailTable rows={NOCHES_DETAIL} total={600_000} />
          </Collapsible>

          <Collapsible title={t('Subasta Virtual', 'Virtual Auction')} color="#d97706" amount={108_500}>
            <DetailTable rows={[
              { label: 'Recaudia Donor Care',     amount: 38_500 },
              { label: 'Recaudia Plataforma QR',  amount: 30_000 },
              { label: 'Catálogo / Diseñadora',   amount: 20_000 },
              { label: 'Recaudia Facers Golf 2026',amount: 10_000 },
              { label: 'Recaudia Facers Golf 2025',amount: 10_000 },
              { label: 'Recaudia Nebula',          amount:  7_500 },
            ]} total={108_500} />
          </Collapsible>

          <Collapsible title={t('PAZ – Esculturas', 'PAZ – Sculptures')} color="#059669" amount={89_784}>
            <DetailTable rows={[{ label: 'Rich Arnauda Esculturas / TransformArte', amount: 89_784 }]} total={89_784} />
          </Collapsible>

          <Collapsible title="CPCCM – Subvención Global" color="#1e3a5f" amount={1_250_000}>
            <DetailTable rows={[{ label: 'CPCCM – Convenio de Subvención Global', amount: 1_250_000 }]} total={1_250_000} />
          </Collapsible>

        </div>
      </div>

    </div>
  );
}
