import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
const money = (value) => `${new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value) || 0)} FCFA`;
function MonthlyChart({ data }) {
  return <div className="h-72 w-full sm:h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 2 }}>
    <CartesianGrid stroke="#eee9f5" strokeDasharray="4 5" vertical={false} /><XAxis dataKey="month" tick={{ fill: "#817a91", fontSize: 12 }} tickLine={false} axisLine={false} /><YAxis tickFormatter={money} tick={{ fill: "#817a91", fontSize: 11 }} tickLine={false} axisLine={false} width={76} /><Tooltip formatter={(v) => [`${Number(v).toLocaleString("fr-FR")} FCFA`]} contentStyle={{ borderRadius: 14, border: "1px solid #eae5f3", boxShadow: "0 8px 24px #33205218" }} /><Legend />
    <Line type="monotone" dataKey="income" name="Income" stroke="#56a880" strokeWidth={3} dot={{ r: 3, fill: "#56a880" }} activeDot={{ r: 6 }} /><Line type="monotone" dataKey="expense" name="Expenses" stroke="#9b7ae8" strokeWidth={3} dot={{ r: 3, fill: "#9b7ae8" }} activeDot={{ r: 6 }} />
  </LineChart></ResponsiveContainer></div>;
}
export default MonthlyChart;
