import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Users } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { createBooking } from "../../services/bookingService";

function BookEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({ eventDate: "", numberOfGuests: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createBooking(
        { event: id, eventDate: form.eventDate, numberOfGuests: Number(form.numberOfGuests) },
        token
      );
      navigate("/my-bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-40 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80" alt="book" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6 max-w-3xl mx-auto">
          <Link to="/events" className="text-white/70 hover:text-white flex items-center gap-1.5 text-sm mb-2 transition-colors w-fit">
            <ArrowLeft size={15} /> Back to Events
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Book Your Event</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Fill in your details</h2>

          {error && <p className="mb-5 text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-lg">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <CalendarDays size={14} /> Event Date
                </label>
                <input name="eventDate" type="date" required value={form.eventDate} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Users size={14} /> Number of Guests
                </label>
                <input name="numberOfGuests" type="number" min="1" required value={form.numberOfGuests} onChange={handleChange} placeholder="e.g. 100"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-xl font-semibold transition text-sm disabled:opacity-60">
              {loading ? "Confirming..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookEvent;
