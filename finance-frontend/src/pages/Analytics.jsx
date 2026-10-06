
import { useEffect, useState } from "react";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get(
          "/transactions/category_summary/"
        );

        setData(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des analytics :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Understand where your money goes.
        </p>
      </div>


      {loading ? (
        <p className="text-sm text-slate-500">
          Loading analytics...
        </p>
      ) : data.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            No expense data available.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Pie chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4">
              <h2 className="font-semibold text-slate-900">
                Expenses by category
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Distribution of your expenses
              </p>
            </div>

            <div className="h-80">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={data}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label={({ percentage }) => `${percentage}%`}
                  >

                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={[
                          "#6366f1",
                          "#10b981",
                          "#f59e0b",
                          "#f43f5e",
                          "#8b5cf6",
                          "#06b6d4",
                        ][index % 6]}
                      />
                    ))}

                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `${Number(value).toLocaleString("fr-FR")} FCFA`
                    }
                  />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* Category table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="font-semibold text-slate-900">
                Spending breakdown
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your expenses by category
              </p>
            </div>


            <div className="space-y-5">

              {data.map((item) => (

                <div key={item.category}>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-sm font-medium text-slate-700">
                      {item.category}
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {Number(item.total).toLocaleString("fr-FR")} FCFA
                    </span>

                  </div>


                  <div className="h-2 rounded-full bg-slate-100">

                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />

                  </div>


                  <p className="mt-1 text-xs text-slate-500">
                    {item.percentage}%
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Analytics;
