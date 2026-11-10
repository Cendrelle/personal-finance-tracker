import { useEffect, useState } from "react";
import api from "../services/api";
import GlassButton from "./GlassButton";

const today = new Date().toISOString().slice(0, 10);
export default function TransactionForm({ transaction, defaultType = "EXPENSE", onSaved, onCancel }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ type: transaction?.type || (defaultType === "income" ? "INCOME" : "EXPENSE"), amount: transaction?.amount || "", category: transaction?.category || "", date: transaction?.date || today, description: transaction?.description || "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/categories/").then((r) => setCategories(r.data)).catch(() => setError("Could not load categories.")); }, []);
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      const payload = { ...form, amount: Number(form.amount), category: Number(form.category) };
      if (transaction) await api.patch(`/transactions/${transaction.id}/`, payload);
      else await api.post("/transactions/", payload);
      onSaved();
    } catch (e) { setError(e.response?.data?.detail || "Could not save this transaction. Please check the fields."); }
    finally { setLoading(false); }
  };
  return <form onSubmit={submit} className="space-y-4">
    <div><span className="label">Type</span><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => update("type")({ target: { value: "EXPENSE" } })} className={`field ${form.type === "EXPENSE" ? "!border-purple-300 !bg-purple-50" : ""}`}>− Expense</button><button type="button" onClick={() => update("type")({ target: { value: "INCOME" } })} className={`field ${form.type === "INCOME" ? "!border-emerald-300 !bg-emerald-50" : ""}`}>＋ Income</button></div></div>
    <div><label className="label" htmlFor="amount">Amount (FCFA)</label><input id="amount" className="field" type="number" min="0.01" step="0.01" value={form.amount} onChange={update("amount")} required /></div>
    <div><label className="label" htmlFor="category">Category</label><select id="category" className="field" value={form.category} onChange={update("category")} required><option value="">Choose a category</option>{categories.map((c) => <option value={c.id} key={c.id}>{c.name}</option>)}</select>{categories.length === 0 && <p className="mt-1 text-xs text-slate-500">Add a category before saving a transaction.</p>}</div>
    <div><label className="label" htmlFor="date">Date</label><input id="date" className="field" type="date" value={form.date} onChange={update("date")} required /></div>
    <div><label className="label" htmlFor="description">Description</label><textarea id="description" className="field min-h-24" value={form.description} onChange={update("description")} placeholder="Add a note (optional)" /></div>
    {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
    <div className="flex justify-end gap-2 pt-2"><GlassButton type="button" onClick={onCancel}>Cancel</GlassButton><GlassButton variant="primary" loading={loading} disabled={!categories.length}>{transaction ? "Save changes" : "Add transaction"}</GlassButton></div>
  </form>;
}
