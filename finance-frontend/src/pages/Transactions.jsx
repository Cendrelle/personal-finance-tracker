import { useEffect, useState } from "react";
import api from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/transactions/");
        setTransactions(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des transactions :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("fr-FR").format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };

  const getCategoryName = (category) => {
    const categories = {
      1: "Alimentation",
      2: "Transport",
      3: "Logement",
      4: "Loisirs",
      5: "Santé",
      6: "Abonnements",
      7: "Salaire",
    };

    return categories[category] || "Autre";
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Transactions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage your financial transactions.
        </p>
      </div>


      {/* Transactions table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">
            No transactions found.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b border-slate-200 bg-slate-50">

                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Description
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amount
                  </th>
                </tr>

              </thead>


              <tbody className="divide-y divide-slate-100">

                {transactions.map((transaction) => (

                  <tr
                    key={transaction.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {formatDate(transaction.date)}
                    </td>


                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {getCategoryName(transaction.category)}
                    </td>


                    <td className="px-6 py-4 text-sm text-slate-500">
                      {transaction.description || "-"}
                    </td>


                    <td className="px-6 py-4">

                      {transaction.type === "INCOME" ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                          Income
                        </span>
                      ) : (
                        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
                          Expense
                        </span>
                      )}

                    </td>


                    <td
                      className={`whitespace-nowrap px-6 py-4 text-right text-sm font-semibold ${
                        transaction.type === "INCOME"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {transaction.type === "INCOME" ? "+" : "-"}
                      {formatAmount(transaction.amount)} FCFA
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Transactions;

