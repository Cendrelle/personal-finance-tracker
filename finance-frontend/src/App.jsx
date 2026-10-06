import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Analytics from "./pages/Analytics";


function App() {
  return (
    <BrowserRouter>

      <div className="flex min-h-screen bg-slate-50">

        <Sidebar />

        <div className="flex flex-1 flex-col">

          <Navbar />

          <main className="flex-1 p-6">

            <Routes>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/transactions"
                element={<Transactions />}
              />

              <Route
                path="/categories"
                element={<Categories />}
              />

              <Route
                path="/analytics"
                element={<Analytics />}
              />

            </Routes>

          </main>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;