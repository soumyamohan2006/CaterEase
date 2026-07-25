import { Link } from "react-router-dom";

function CateringPackageCard({ packageData }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">

      <div className="h-40 bg-green-100 rounded-lg flex items-center justify-center">
        🍽️
      </div>

      <h2 className="text-xl font-bold mt-4">
        {packageData.name}
      </h2>

      <p className="text-gray-500 mt-2">
        {packageData.description}
      </p>

      <p className="text-orange-600 font-bold text-lg mt-3">
        ${packageData.price}
      </p>

      <Link
        to={`/catering/${packageData._id}`}
        className="block text-center mt-4 bg-orange-600 text-white py-2 rounded-lg"
      >
        View Package
      </Link>

    </div>
  );
}

export default CateringPackageCard;