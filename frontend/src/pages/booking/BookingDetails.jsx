import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Users, Phone, Mail, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getBookingById } from "../../services/bookingService";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-500",
  cancelled: "bg-red-100 text-red-500",
};

function BookingDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBookingById(id, token)
      .then(setBooking)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  if (error || !booking) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
      <p className="text-xl font-semibold">{error || "Booking not found."}</p>
      <Link to="/my-bookings" className="mt-4 text-orange-400 font-semibold flex items-center gap-1.5 hover:gap-3 transition-all">
        <ArrowLeft size={16} /> Back to My Bookings
      </Link>
    </div>
  );

  const u = booking.user || {};
  const ev = booking.event || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-40 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80" alt="booking" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6 max-w-3xl mx-auto">
          <Link to="/my-bookings" className="text-white/70 hover:text-white flex items-center gap-1.5 text-sm mb-2 transition-colors w-fit">
            <ArrowLeft size={15} /> Back to My Bookings
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white">{ev.name || "Booking"}</h1>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyles[booking.status] || "bg-gray-100 text-gray-500"}`}>
              {booking.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Booking Information</h2>
          <div className="grid sm:grid-cols-2 gap-5 text-sm">
            {[
              { icon: CalendarDays, label: "Event Date", value: booking.eventDate?.slice(0, 10) },
              { icon: MapPin, label: "Location", value: ev.location || "—" },
              { icon: Users, label: "Guests", value: `${booking.numberOfGuests} guests` },
              { icon: CalendarDays, label: "Booking ID", value: booking.bookingId },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Contact Details</h2>
          <div className="grid sm:grid-cols-2 gap-5 text-sm">
            {[
              { icon: User, label: "Name", value: u.name },
              { icon: Mail, label: "Email", value: u.email },
              { icon: Phone, label: "Phone", value: u.phone || "—" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
          {booking.totalAmount && (
            <div className="mt-5 pt-5 border-t border-gray-100 flex justify-between text-sm">
              <span className="text-gray-400">Total Amount</span>
              <span className="font-bold text-gray-900">₹{booking.totalAmount}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Link to="/events" className="flex-1 text-center bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-xl font-semibold transition text-sm">
            Book Another Event
          </Link>
          <Link to="/my-bookings" className="flex-1 text-center border border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-xl font-semibold transition text-sm">
            All Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
