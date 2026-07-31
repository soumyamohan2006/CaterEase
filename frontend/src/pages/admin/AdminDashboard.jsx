import { useState, useEffect } from "react";
import { Users, CalendarDays, UtensilsCrossed, IndianRupee, TrendingUp } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getAdminStats, getAdminBookings } from "../../services/adminService";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-500",
  cancelled: "bg-red-100 text-red-500",
};

function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdminStats(token), getAdminBookings(token)])
      .then(([s, b]) => { setStats(s); setBookings(b.slice(0, 5)); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const cards = [
    { icon: Users, label: "Total Users", value: stats?.users, color: "bg-blue-50 text-blue-500" },
    { icon: CalendarDays, label: "Total Bookings", value: stats?.bookings, color: "bg-orange-50 text-orange-500" },
    { icon: UtensilsCrossed, label: "Events", value: stats?.events, color: "bg-purple-50 text-purple-500" },
    { icon: IndianRupee, label: "Revenue", value: stats?.revenue ? `₹${stats.revenue.toLocaleString()}` : "₹0", color: "bg-green-50 text-green-500" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Overview of your platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-gray-400 text-xs">{label}</p>
              <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{loading ? "—" : value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={18} className="text-orange-400" />
          <h2 className="font-bold text-gray-900">Recent Bookings</h2>
        </div>

        {loading && <p className="text-gray-400 text-sm text-center py-6">Loading...</p>}
        {!loading && bookings.length === 0 && <p className="text-gray-400 text-sm text-center py-6">No bookings yet.</p>}
        {!loading && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-xs border-b border-gray-100">
                  <th className="text-left pb-3 font-medium">Booking ID</th>
                  <th className="text-left pb-3 font-medium">Customer</th>
                  <th className="text-left pb-3 font-medium">Event</th>
                  <th className="text-left pb-3 font-medium">Date</th>
                  <th className="text-left pb-3 font-medium">Amount</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td className="py-3 text-gray-500 font-mono text-xs">{b.bookingId}</td>
                    <td className="py-3 font-medium text-gray-800">{b.user?.name}</td>
                    <td className="py-3 text-gray-600">{b.event?.name}</td>
                    <td className="py-3 text-gray-500">{b.eventDate?.slice(0, 10)}</td>
                    <td className="py-3 font-semibold text-gray-800">₹{b.totalAmount?.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
