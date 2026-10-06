import SummaryCard from "../components/SummaryCard";
import { useEffect, useState } from "react";
import MonthlyChart from "../components/MonthlyChart";
import api from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryResponse, monthlyResponse] = await Promise.all([
          api.get("/transactions/summary/"),
          api.get("/transactions/monthly-summary/"),
        ]);

        setSummary(summaryResponse.data);

        const formattedMonthlyData = Object.entries(
          monthlyResponse.data
        ).map(([month, values]) => ({
          month,
          ...values,
        }));

        setMonthlyData(formattedMonthlyData);

      } catch (error) {
        console.error(
          "Erreur lors du chargement du dashboard :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, Cendrelle 👋
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your finances.
          </p>
        </div>

        <button className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
          + Add transaction
        </button>

      </div>


      {/* Summary cards */}

      <div className="grid gap-5 md:grid-cols-3">

        ```jsx
        <SummaryCard
          title="Total Balance"
          value={summary?.balance ?? 0}
          description="Your current balance"
          icon="💰"
          variant="balance"
        />

        <SummaryCard
          title="Total Income"
          value={summary?.total_income ?? 0}
          description="Total income"
          icon="📈"
          variant="income"
        />

        <SummaryCard
          title="Total Expenses"
          value={summary?.total_expense ?? 0}
          description="Total expenses"
          icon="📉"
          variant="expense"
        />
        ```


      </div>


      {/* Main content */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Chart */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-semibold text-slate-900">
                Spending overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your expenses over time
              </p>
            </div>

            <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 outline-none">
              <option>This month</option>
              <option>Last month</option>
              <option>Last 6 months</option>
            </select>

          </div>


          {/* Temporary chart */}

          <div className="mt-8">
            {loading ? (
              <p className="text-sm text-slate-500">
                Loading chart...
              </p>
            ) : (
              <MonthlyChart data={monthlyData} />
            )}
          </div>

        </div>


        {/* Category summary */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div>
            <h2 className="font-semibold text-slate-900">
              Expenses by category
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Where your money goes
            </p>
          </div>


          <div className="mt-6 space-y-5">

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">
                  🍔 Food
                </span>

                <span className="font-medium text-slate-900">
                  35%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[35%] rounded-full bg-indigo-500" />
              </div>
            </div>


            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">
                  🚗 Transport
                </span>

                <span className="font-medium text-slate-900">
                  25%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[25%] rounded-full bg-emerald-500" />
              </div>
            </div>


            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">
                  🏠 Housing
                </span>

                <span className="font-medium text-slate-900">
                  20%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[20%] rounded-full bg-amber-500" />
              </div>
            </div>


            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">
                  🎮 Leisure
                </span>

                <span className="font-medium text-slate-900">
                  20%
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[20%] rounded-full bg-rose-500" />
              </div>
            </div>

          </div>

        </div>

      </div>


      {/* Recent transactions */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>
            <h2 className="font-semibold text-slate-900">
              Recent transactions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest financial activity
            </p>
          </div>

          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View all
          </button>

        </div>


        <div className="divide-y divide-slate-100">

          <div className="flex items-center justify-between p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50">
                🍔
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  Food
                </p>

                <p className="text-xs text-slate-500">
                  October 15, 2026
                </p>
              </div>

            </div>

            <span className="font-semibold text-rose-600">
              -12,000 FCFA
            </span>

          </div>


          <div className="flex items-center justify-between p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                💰
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  Salary
                </p>

                <p className="text-xs text-slate-500">
                  October 1, 2026
                </p>
              </div>

            </div>

            <span className="font-semibold text-emerald-600">
              +250,000 FCFA
            </span>

          </div>


          <div className="flex items-center justify-between p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                🚗
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  Transport
                </p>

                <p className="text-xs text-slate-500">
                  October 18, 2026
                </p>
              </div>

            </div>

            <span className="font-semibold text-rose-600">
              -5,000 FCFA
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;