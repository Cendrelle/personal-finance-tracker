import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Overview of your finances
        </p>
      </div>


      <div className="flex items-center gap-4">

        <button
          onClick={handleLogout}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-rose-600"
        >
          Logout
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
          C
        </div>

      </div>

    </header>
  );
}

export default Navbar;
