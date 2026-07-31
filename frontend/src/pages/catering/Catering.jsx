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

  return (
    <div>
      <section className="relative h-56 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1600&q=80" alt="catering" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-extrabold">Catering Packages</h1>
          <p className="mt-2 text-gray-300">Premium catering for every occasion and budget.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          {loading && <div className="text-center py-16 text-gray-400">Loading packages...</div>}
          {error && <div className="text-center py-16 text-red-400">{error}</div>}
          {!loading && !error && (
            packages.length ? (
              <div className="grid md:grid-cols-3 gap-6">
                {packages.map((p) => <CateringPackageCard key={p._id} packageData={p} />)}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">No packages available.</div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default Catering;
