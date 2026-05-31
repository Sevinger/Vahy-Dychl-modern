import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/api/supabaseClient";

export default function BestsellerSection() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    supabase
      .from("bestseller_items")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data }) => setItems(data || []));
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-16" style={{ background: "#6b6b6b" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-3">
            Nejprodávanější
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-blue-900">
            Nejprodávanější váhy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => item.search_term && navigate(`/katalog?search=${encodeURIComponent(item.search_term)}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all text-left group"
            >
              <div
                style={{ background: "linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)" }}
                className="px-4 py-3"
              >
                <span className="text-white font-bold text-sm">{item.name}</span>
              </div>
              <div className="p-4 flex flex-col items-center">
                {item.img_url && (
                  <img
                    src={item.img_url}
                    alt={item.name}
                    className="w-full max-h-44 object-contain mb-3"
                  />
                )}
                <p className="text-sm font-bold text-red-600 text-center">{item.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
