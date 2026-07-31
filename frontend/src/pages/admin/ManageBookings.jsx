import { useState, useEffect } from "react";
import { CalendarDays, Users, MapPin, Tag, ChevronDown, ChevronUp, IndianRupee, Phone, Mail } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getAdminBookings, updateBookingStatus } from "../../services/adminService";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-500",
  cancelled: "bg-red-100 text-red-500",
};

const fallbackImg = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80";

function BookingRow({ b, onStatus, updating }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Main Row */}
      <tr
        className="hover:bg-gray-50 transition cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        <td className="px-6 py-4 font-mono text-xs text-gray-400">{b.bookingId}</td>
        <td className="px-6 py-4">
          <p className="font-semibold text-gray-800">{b.user?.name}</p>
          <p className="text-xs text-gray-400">{b.user?.email}</p>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <img src={b.event?.image || fallbackImg} alt={b.event?.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
            <p className="font-medium text-gray-700">{b.event?.name}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          <p className="flex items-center gap-1 text-gray-600 text-xs"><CalendarDays size={11} /> {b.eventDate?.slice(0, 10)}</p>
          <p className="flex items-center gap-1 text-gray-400 text-xs mt-0.5"><Users size={11} /> {b.numberOfGuests} guests</p>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-800">₹{b.totalAmount?.toLocaleString()}</td>
        <td className="px-6 py-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[b.status]}`}>
            {b.status}
          </span>
        </td>
        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2">
            {b.status === "pending" && (
              <>
                <button onClick={() => onStatus(b._id, "confirmed")} disabled={updating === b._id}
                  className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50">
                  Approve
                </button>
                <button onClick={() => onStatus(b._id, "cancelled")} disabled={updating === b._id}
                  className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50">
                  Cancel
                </button>
              </>
            )}
            {b.status === "confirmed" && (
              <button onClick={() => onStatus(b._id, "completed")} disabled={updating === b._id}
                className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50">
                Complete
              </button>
            )}
            {(b.status === "completed" || b.status === "cancelled") && (
              <span className="text-xs text-gray-400">—</span>
            )}
          </div>
        </td>
        <td className="px-4 py-4 text-gray-400">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </td>
      </tr>

      {/* Expanded Detail Row */}
      {expanded && (
        <tr className="bg-orange-50/40">
          <td colSpan={8} className="px-6 py-5">
            <div className="grid md:grid-cols-3 gap-5">

              {/* Event Details */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Event Details</p>
                <div className="flex gap-3 mb-3">
                  <img src={b.event?.image || fallbackImg} alt={b.event?.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">{b.event?.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{b.event?.description}</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <p className="flex items-center gap-1.5"><MapPin size={11} className="text-orange-400" /> {b.event?.location}</p>
                  <p className="flex items-center gap-1.5"><Tag size={11} className="text-orange-400" /> {b.event?.category}</p>
                  <p className="flex items-center gap-1.5"><IndianRupee size={11} className="text-orange-400" /> Base price: ₹{b.event?.price?.toLocaleString()}</p>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Customer Details</p>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold text-sm shrink-0">
                      {b.user?.name?.[0]?.toUpperCase()}
                    </div>
                    <p className="font-semibold text-gray-800">{b.user?.name}</p>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-gray-500"><Mail size={11} className="text-orange-400" /> {b.user?.email}</p>
                  <p className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={11} className="text-orange-400" /> {b.user?.phone || "Not provided"}</p>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Booking Summary</p>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Booking ID", value: b.bookingId },
                    { label: "Event Date", value: b.eventDate?.slice(0, 10) },
                    { label: "Guests", value: `${b.numberOfGuests} guests` },
                    { label: "Catering", value: b.catering?.name || "None" },
                    { label: "Total Amount", value: `₹${b.totalAmount?.toLocaleString()}` },
                    { label: "Payment", value: b.paymentStatus || "pending" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-gray-400">{label}</span>
                      <span className="font-semibold text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function ManageBookings() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAdminBookings(token)
      .then(setBookings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const handleStatus = async (id, status) => {
    setUpdating(id);
    try {
      const updated = await updateBookingStatus(id, status, token);
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: updated.status } : b));
    } catch {}
    finally { setUpdating(null); }
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Manage Bookings</h1>
          <p className="text-gray-400 text-sm mt-1">Click any row to see full details</p>
        </div>
        {/* Filter tabs */}
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${filter === s ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading && <p className="text-gray-400 text-sm text-center py-12">Loading...</p>}
        {!loading && filtered.length === 0 && <p className="text-gray-400 text-sm text-center py-12">No bookings found.</p>}
        {!loading && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-gray-400 text-xs">
                  <th className="text-left px-6 py-4 font-medium">Booking ID</th>
                  <th className="text-left px-6 py-4 font-medium">Customer</th>
                  <th className="text-left px-6 py-4 font-medium">Event</th>
                  <th className="text-left px-6 py-4 font-medium">Date & Guests</th>
                  <th className="text-left px-6 py-4 font-medium">Amount</th>
                  <th className="text-left px-6 py-4 font-medium">Status</th>
                  <th className="text-left px-6 py-4 font-medium">Actions</th>
                  <th className="px-4 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((b) => (
                  <BookingRow key={b._id} b={b} onStatus={handleStatus} updating={updating} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBookings;
