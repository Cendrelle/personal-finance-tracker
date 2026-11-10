import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import GlassButton from "../components/GlassButton";

function Login() {
  const navigate = useNavigate(); const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const handleLogin = async (event) => { event.preventDefault(); setError(""); setLoading(true); try { const response = await api.post("/token/", { username, password }); sessionStorage.setItem("access_token", response.data.access); sessionStorage.setItem("refresh_token", response.data.refresh); navigate("/"); } catch { setError("Your username or password is not correct."); } finally { setLoading(false); } };
  return <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_#eee7ff,_#f8f6ff_65%)] px-4"><div className="surface w-full max-w-md p-7 sm:p-9"><div className="mb-8 text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-purple-100 text-2xl text-purple-700">✿</div><h1 className="brand-wordmark text-3xl text-purple-900">Sweet Money</h1><p className="mt-2 text-sm text-slate-500">Sign in to your little money space</p></div><form onSubmit={handleLogin} className="space-y-5"><div><label className="label" htmlFor="username">Username</label><input id="username" type="text" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} className="field" placeholder="Enter your username" required /></div><div><label className="label" htmlFor="password">Password</label><input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="field" placeholder="Enter your password" required /></div>{error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}<GlassButton type="submit" variant="primary" loading={loading} className="w-full">Sign in</GlassButton></form></div></div>;
}
export default Login;
