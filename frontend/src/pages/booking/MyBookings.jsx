import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getMyBookings } from "../../services/bookingService";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-500",
  cancelled: "bg-red-100 text-red-500",
};

function MyBookings() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyBookings(token)
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <section className="relative h-48 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80" alt="bookings" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-extrabold">My Bookings</h1>
          <p className="mt-2 text-gray-300 text-sm">Track and manage all your event bookings.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          {loading && <div className="text-center py-16 text-gray-400">Loading bookings...</div>}
          {error && <div className="text-center py-16 text-red-400">{error}</div>}
          {!loading && !error && (
            bookings.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg font-semibold">No bookings yet.</p>
                <Link to="/events" className="mt-4 inline-flex items-center gap-1.5 text-orange-400 font-semibold hover:gap-3 transition-all">
                  Explore Events <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-gray-900">{b.event?.name || "Event"}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${statusStyles[b.status] || "bg-gray-100 text-gray-500"}`}>
                          {b.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {b.eventDate?.slice(0, 10)}</span>
                        {b.event?.location && <span className="flex items-center gap-1.5"><MapPin size={13} /> {b.event.location}</span>}
                        <span className="flex items-center gap-1.5"><Users size={13} /> {b.numberOfGuests} guests</span>
                      </div>
                    </div>
                    <Link to={`/booking/${b._id}`}
                      className="shrink-0 flex items-center gap-1.5 text-sm text-orange-400 font-semibold hover:gap-2.5 transition-all">
                      View Details <ArrowRight size={15} />
                    </Link>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default MyBookings;
