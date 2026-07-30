import { Link } from "react-router-dom";

function CustomerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-10 py-12">

      <h1 className="text-4xl font-bold">
        Customer Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-gray-500">
            Total Bookings
          </h2>

          <p className="text-3xl font-bold mt-2">
            5
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-gray-500">
            Upcoming Events
          </h2>

          <p className="text-3xl font-bold mt-2">
            2
          </p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-gray-500">
            Completed Events
          </h2>

          <p className="text-3xl font-bold mt-2">
            3
          </p>
        </div>

      </div>

      <div className="mt-8">

        <Link
          to="/my-bookings"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          View My Bookings
        </Link>

      </div>

    </div>
  );
}

export default CustomerDashboard;