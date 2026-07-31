import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCateringById } from "../../services/cateringService";

const fallbackImg = "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80";

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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  if (error || !pkg) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
      <p className="text-xl font-semibold">{error || "Package not found."}</p>
      <Link to="/catering" className="mt-4 text-orange-400 font-semibold flex items-center gap-1.5 hover:gap-3 transition-all">
        <ArrowLeft size={16} /> Back to Packages
      </Link>
    </div>
  );

  return (
    <div>
      <div className="relative h-72 overflow-hidden">
        <img src={pkg.image || fallbackImg} alt={pkg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        {pkg.pricePerPerson && (
          <div className="absolute top-3 right-6 bg-orange-400 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow z-10">
            ₹{pkg.pricePerPerson}/person
          </div>
        )}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8 max-w-6xl mx-auto">
          <Link to="/catering" className="text-white/70 hover:text-white flex items-center gap-1.5 text-sm mb-3 transition-colors w-fit">
            <ArrowLeft size={15} /> Back to Packages
          </Link>
          <h1 className="text-4xl font-extrabold text-white">{pkg.name}</h1>
          <p className="text-gray-300 text-sm mt-1">{pkg.description}</p>
        </div>
      </div>

      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Package Overview</h2>
              <p className="text-gray-500 leading-relaxed">{pkg.description}</p>
            </div>

            {pkg.menuItems?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Menu Items</h2>
                <ul className="space-y-2 text-gray-500 text-sm">
                  {pkg.menuItems.map((item) => (
                    <li key={item._id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
              <ul className="space-y-2 text-gray-500 text-sm">
                {["Professional chef & service staff", "Premium quality ingredients", "Custom menu planning", "Setup & cleanup", "Dedicated event coordinator"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Package Details</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Price/Person", value: pkg.pricePerPerson ? `₹${pkg.pricePerPerson}` : "—" },
                  { label: "Category", value: pkg.category || "—" },
                  { label: "Availability", value: pkg.isAvailable ? "Available" : "Unavailable" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to={`/book-event/${pkg._id}`}
              className="flex items-center justify-center gap-2 w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-xl font-semibold transition">
              Book This Package <ArrowRight size={16} />
            </Link>

            <Link to="/catering"
              className="flex items-center justify-center gap-2 w-full border-2 border-orange-400 text-orange-400 hover:bg-orange-50 py-3 rounded-xl font-semibold transition">
              View All Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MenuDetails;
