import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Users, MapPin, Tag } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { createBooking } from "../../services/bookingService";
import { getEventById } from "../../services/eventService";

function BookEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({ eventDate: "", numberOfGuests: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEventById(id)
      .then(setEvent)
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
  }, [id]);

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

  if (fetching) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-48 overflow-hidden">
        <img src={event?.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80"} alt="book" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6 max-w-4xl mx-auto">
          <Link to={`/events/${id}`} className="text-white/70 hover:text-white flex items-center gap-1.5 text-sm mb-2 transition-colors w-fit">
            <ArrowLeft size={15} /> Back to Event
          </Link>
          <h1 className="text-3xl font-extrabold text-white">Book — {event?.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

        {/* Event Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Event Summary</h3>
            <div className="space-y-3 text-sm">
              {[
                { icon: Tag, label: "Category", value: event?.category },
                { icon: MapPin, label: "Location", value: event?.location },
                { icon: CalendarDays, label: "Date", value: event?.date?.slice(0, 10) },
                { icon: Tag, label: "Base Price", value: event?.price ? `₹${event.price.toLocaleString()}` : "—" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">{label}</p>
                    <p className="font-semibold text-gray-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Booking Details</h2>

            {error && <p className="mb-5 text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-lg">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <CalendarDays size={14} /> Event Date
                  </label>
                  <input name="eventDate" type="date" required value={form.eventDate} onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
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

              {form.numberOfGuests && event?.price && (
                <div className="bg-orange-50 rounded-xl px-5 py-4 flex justify-between items-center text-sm">
                  <span className="text-gray-600">Estimated Total</span>
                  <span className="font-bold text-orange-500 text-base">₹{Number(event.price).toLocaleString()}</span>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-xl font-semibold transition text-sm disabled:opacity-60">
                {loading ? "Confirming..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookEvent;
