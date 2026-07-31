import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const fallback = "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80";

function CateringPackageCard({ packageData }) {
  const img = packageData.image || fallback;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img src={img} alt={packageData.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          ₹{packageData.pricePerPerson}/person
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-base">{packageData.name}</h3>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{packageData.description}</p>
        <Link to={`/catering/${packageData._id}`}
          className="mt-4 flex items-center justify-center gap-2 bg-orange-400 hover:bg-orange-500 text-white py-2.5 rounded-xl text-sm font-semibold transition">
          View Package <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

export default CateringPackageCard;
