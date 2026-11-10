import { useLocation, useNavigate } from "react-router-dom";
import GlassButton from "./GlassButton";

const titles = { "/": ["Your money, softly", "A clear view of your finances"], "/transactions": ["Transactions", "Your recent money activity"], "/categories": ["Categories", "The labels you use to stay organized"], "/analytics": ["Analytics", "See the shape of your spending"] };
function Navbar() {
  const navigate = useNavigate(); const location = useLocation(); const title = titles[location.pathname] || titles["/"];
  const logout = () => { sessionStorage.removeItem("access_token"); sessionStorage.removeItem("refresh_token"); navigate("/login"); };
  return <header className="flex items-center justify-between border-b border-purple-100/80 bg-white/60 px-5 py-4 md:px-10"><div><h2 className="text-lg font-bold text-slate-800">{title[0]}</h2><p className="mt-0.5 hidden text-sm text-slate-500 sm:block">{title[1]}</p></div><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4b8d8] font-semibold text-purple-900">♡</div><GlassButton size="small" onClick={logout}>Sign out</GlassButton></div></header>;
}
export default Navbar;
