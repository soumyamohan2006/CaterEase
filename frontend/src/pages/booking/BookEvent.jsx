import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../../services/eventService";
import { getCatering } from "../../services/cateringService";
import { createBooking } from "../../services/bookingService";

function BookEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [cateringPackages, setCateringPackages] = useState([]);
  const [form, setForm] = useState({
    eventDate: "",
    numberOfGuests: 1,
    catering: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getEventById(id), getCatering()])
      .then(([ev, cat]) => {
        setEvent(ev);
        setCateringPackages(cat);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createBooking({
        event: id,
        eventDate: form.eventDate,
        numberOfGuests: Number(form.numberOfGuests),
        catering: form.catering || undefined,
      });
      navigate("/my-bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!event) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold">Book: {event.name}</h1>
      <p className="text-gray-500 mt-2">
        📍 {event.location} &nbsp;|&nbsp; Base price: ₹{event.price?.toLocaleString()}
      </p>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Guests
          </label>
          <input
            type="number"
            name="numberOfGuests"
            min="1"
            value={form.numberOfGuests}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Catering Package (optional)
          </label>
          <select
            name="catering"
            value={form.catering}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">No catering</option>
            {cateringPackages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.name} — ₹{pkg.pricePerPerson}/person
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-orange-600 text-white py-3 rounded-lg mt-4 disabled:opacity-60"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

export default BookEvent;
