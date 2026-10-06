import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white md:block">

      <div className="p-6">

        <h1 className="text-xl font-bold text-slate-900">
          Finance Tracker
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Personal finance
        </p>

      </div>


      <nav className="px-4">

        <Link
          to="/"
          className="block rounded-lg bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-600"
        >
          Dashboard
        </Link>


        <Link
          to="/transactions"
          className="mt-2 block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          Transactions
        </Link>


        <Link
          to="/categories"
          className="mt-2 block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          Categories
        </Link>


        <Link
          to="/analytics"
          className="mt-2 block rounded-lg px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          Analytics
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;