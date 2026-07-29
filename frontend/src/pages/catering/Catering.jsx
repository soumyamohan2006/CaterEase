import { useState, useEffect } from "react";
import CateringPackageCard from "../../components/catering/CateringPackageCard";
import { getCatering } from "../../services/cateringService";

function Catering() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCatering()
      .then(setPackages)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-20">Loading packages...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-10 py-12">
      <h1 className="text-4xl font-bold">Catering Packages</h1>

      {packages.length === 0 ? (
        <p className="text-center py-20 text-gray-400">
          No catering packages available.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {packages.map((item) => (
            <CateringPackageCard key={item._id} packageData={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Catering;
