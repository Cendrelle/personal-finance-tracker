function SummaryCard({ title, value, description, icon, variant }) {
  const variants = {
    balance: "bg-indigo-50 text-indigo-600",
    income: "bg-emerald-50 text-emerald-600",
    expense: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value} FCFA
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${variants[variant]}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default SummaryCard;