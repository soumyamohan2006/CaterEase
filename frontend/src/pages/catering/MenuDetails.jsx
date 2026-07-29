import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCateringById } from "../../services/cateringService";

function MenuDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCateringById(id)
      .then(setPkg)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!pkg) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="h-56 bg-green-100 rounded-xl flex items-center justify-center text-5xl mb-8">
        🍽️
      </div>

      <h1 className="text-4xl font-bold">{pkg.name}</h1>
      <p className="text-gray-500 mt-4">{pkg.description}</p>
      <p className="text-orange-600 font-bold text-2xl mt-4">
        ₹{pkg.pricePerPerson} / person
      </p>
      <p className="text-gray-600 mt-2">Category: {pkg.category}</p>

      {pkg.menuItems?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pkg.menuItems.map((item) => (
              <div key={item._id} className="bg-white shadow p-4 rounded-lg">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-orange-600 font-bold mt-1">₹{item.price}</p>
                {item.vegetarian && (
                  <span className="text-green-600 text-xs">🌿 Vegetarian</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuDetails;
