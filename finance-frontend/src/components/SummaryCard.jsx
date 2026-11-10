function SummaryCard({ title, value, description, icon, variant }) {
  const variants = { balance: "bg-purple-100 text-purple-700", income: "bg-emerald-100 text-emerald-700", expense: "bg-pink-100 text-pink-700" };
  return <article className="surface p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-500">{title}</p><p className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{value == null ? "—" : <>{new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Number(value) || 0)} <span className="text-sm font-semibold text-slate-500">FCFA</span></>}</p><p className="mt-2 text-xs text-slate-500">{description}</p></div><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl ${variants[variant] || variants.balance}`} aria-hidden="true">{icon}</span></div></article>;
}
export default SummaryCard;
