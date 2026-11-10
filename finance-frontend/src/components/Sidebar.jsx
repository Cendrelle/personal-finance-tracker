import { NavLink } from "react-router-dom";

const links = [{ to: "/", label: "Home", icon: "⌂", end: true }, { to: "/transactions", label: "Activity", icon: "↕" }, { to: "/categories", label: "Categories", icon: "◈" }, { to: "/analytics", label: "Analytics", icon: "▥" }];
function Sidebar() {
  return <><aside className="hidden min-h-screen w-64 shrink-0 border-r border-purple-100 bg-white/80 p-5 md:block">
    <div className="mb-9 flex items-center gap-3 px-2 pt-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-xl text-purple-700">✿</div><div><h1 className="font-bold text-purple-900">Sweet Money</h1><p className="text-xs text-slate-500">A little more peace</p></div></div>
    <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">Your space</p><nav className="space-y-1">{links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${isActive ? "bg-purple-100 font-semibold text-purple-800" : "text-slate-600 hover:bg-purple-50"}`}><span className="w-5 text-center text-lg" aria-hidden="true">{link.icon}</span>{link.label}</NavLink>)}</nav>
    <div className="mt-10 rounded-2xl bg-[#f6f1ff] p-4"><span className="text-xl">🌙</span><p className="mt-2 text-sm font-semibold text-purple-900">Small steps add up</p><p className="mt-1 text-xs leading-5 text-slate-500">Keep checking in with your money.</p></div>
  </aside><nav className="mobile-nav" aria-label="Main navigation">{links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `flex flex-col items-center gap-1 rounded-xl py-1 text-[11px] ${isActive ? "font-semibold text-purple-700" : "text-slate-500"}`}><span className="text-xl" aria-hidden="true">{link.icon}</span>{link.label}</NavLink>)}</nav></>;
}
export default Sidebar;
