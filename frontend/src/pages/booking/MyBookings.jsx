import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyBookings } from "../../services/bookingService";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyBookings()
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-20">Loading bookings...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">No bookings yet.</p>
          <Link
            to="/events"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="space-y-4 mt-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow rounded-xl p-6 flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {booking.event?.name || "Event"}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  ID: {booking.bookingId}
                </p>
                <p className="text-gray-600 mt-1">
                  📅 {new Date(booking.eventDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  👥 {booking.numberOfGuests} guests
                </p>
                {booking.catering && (
                  <p className="text-gray-600">
                    🍽️ {booking.catering.name}
                  </p>
                )}
                <p className="text-orange-600 font-bold mt-2">
                  ₹{booking.totalAmount?.toLocaleString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColors[booking.status] || "bg-gray-100"
                }`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
