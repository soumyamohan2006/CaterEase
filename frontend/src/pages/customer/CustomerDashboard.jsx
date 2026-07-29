import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyBookings } from "../../services/bookingService";
import { useAuth } from "../../hooks/useAuth";

function CustomerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBookings()
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const upcoming = bookings.filter((b) =>
    ["pending", "confirmed"].includes(b.status)
  ).length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  return (
    <div className="max-w-7xl mx-auto px-10 py-12">
      <h1 className="text-4xl font-bold">
        Welcome, {user?.name || "Customer"}
      </h1>

      {loading ? (
        <p className="mt-8 text-gray-400">Loading stats...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white shadow-md p-6 rounded-xl">
            <h2 className="text-gray-500">Total Bookings</h2>
            <p className="text-3xl font-bold mt-2">{bookings.length}</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl">
            <h2 className="text-gray-500">Upcoming Events</h2>
            <p className="text-3xl font-bold mt-2">{upcoming}</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-xl">
            <h2 className="text-gray-500">Completed Events</h2>
            <p className="text-3xl font-bold mt-2">{completed}</p>
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Link
          to="/my-bookings"
          className="bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          View My Bookings
        </Link>
        <Link
          to="/events"
          className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg"
        >
          Explore Events
        </Link>
      </div>
    </div>
  );
}

export default CustomerDashboard;
