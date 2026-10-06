import { useEffect, useState } from "react";
import api from "../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des catégories :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Categories
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Organize your transactions by category.
        </p>
      </div>


      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {loading ? (
          <p className="text-sm text-slate-500">
            Loading categories...
          </p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-slate-500">
            No categories found.
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                  🏷️
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    {category.name}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Category #{category.id}
                  </p>
                </div>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Categories;
