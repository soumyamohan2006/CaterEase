import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, CheckCircle, Clock, ArrowRight, PlusCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getMyBookings } from "../../services/bookingService";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-500",
  cancelled: "bg-red-100 text-red-500",
};

function CustomerDashboard() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBookings(token)
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const total = bookings.length;
  const upcoming = bookings.filter((b) => b.status === "pending" || b.status === "confirmed").length;
  const completed = bookings.filter((b) => b.status === "completed").length;
  const recent = bookings.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-400">Welcome back</p>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-1">{user?.name || "Customer"}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          {[
            { icon: CalendarDays, label: "Total Bookings", value: total, color: "bg-blue-50 text-blue-500" },
            { icon: Clock, label: "Upcoming", value: upcoming, color: "bg-yellow-50 text-yellow-500" },
            { icon: CheckCircle, label: "Completed", value: completed, color: "bg-green-50 text-green-500" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="text-3xl font-extrabold text-gray-900 mt-0.5">
                  {loading ? "—" : value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900 text-lg">Recent Bookings</h2>
            <Link to="/my-bookings" className="text-sm text-orange-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {loading && <p className="text-gray-400 text-sm py-4 text-center">Loading...</p>}

          {!loading && recent.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <p className="text-sm">No bookings yet.</p>
              <Link to="/events" className="mt-3 inline-flex items-center gap-1.5 text-orange-400 font-semibold text-sm hover:gap-2.5 transition-all">
                Explore Events <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {!loading && recent.length > 0 && (
            <div className="space-y-3">
              {recent.map((b) => (
                <div key={b._id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-orange-50 transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm">{b.event?.name || "Event"}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${statusStyles[b.status] || "bg-gray-100 text-gray-500"}`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <CalendarDays size={11} /> {b.eventDate?.slice(0, 10)} &nbsp;·&nbsp; {b.numberOfGuests} guests &nbsp;·&nbsp; ₹{b.totalAmount?.toLocaleString()}
                    </p>
                  </div>
                  <Link to={`/booking/${b._id}`} className="text-orange-400 hover:text-orange-500">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/events"
            className="flex items-center gap-3 bg-orange-400 hover:bg-orange-500 text-white px-6 py-4 rounded-2xl font-semibold transition">
            <PlusCircle size={20} /> Book a New Event
          </Link>
          <Link to="/my-bookings"
            className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-6 py-4 rounded-2xl font-semibold transition">
            <CalendarDays size={20} /> View All Bookings
          </Link>
        </div>

      </div>
    </div>
  );
}

export default CustomerDashboard;
