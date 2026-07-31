import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { getEventById } from "../../services/eventService";

const fallbackImg = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEventById(id)
      .then(setEvent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  if (error || !event) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
      <p className="text-xl font-semibold">{error || "Event not found."}</p>
      <Link to="/events" className="mt-4 text-orange-400 font-semibold flex items-center gap-1.5 hover:gap-3 transition-all">
        <ArrowLeft size={16} /> Back to Events
      </Link>
    </div>
  );

  return (
    <div>
      <div className="relative h-72 overflow-hidden">
        <img src={event.image || fallbackImg} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8 max-w-6xl mx-auto">
          <Link to="/events" className="text-white/70 hover:text-white flex items-center gap-1.5 text-sm mb-3 transition-colors w-fit">
            <ArrowLeft size={15} /> Back to Events
          </Link>
          <h1 className="text-4xl font-extrabold text-white">{event.name}</h1>
          <div className="flex items-center gap-1.5 mt-2 text-gray-300 text-sm">
            <MapPin size={14} /> {event.location}
          </div>
        </div>
      </div>

      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this Event</h2>
              <p className="text-gray-500 leading-relaxed">{event.description}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What's Included</h2>
              <ul className="space-y-2 text-gray-500 text-sm">
                {["Professional event coordination", "Premium catering service", "Venue decoration & setup", "Dedicated support team", "Post-event cleanup"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Event Details</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Price", value: event.price ? `₹${event.price}` : "Contact us" },
                  { label: "Location", value: event.location },
                  { label: "Category", value: event.category || "—" },
                  { label: "Status", value: event.status || "Available" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/catering"
              className="flex items-center justify-center gap-2 w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-xl font-semibold transition">
              View Packages <ArrowRight size={16} />
            </Link>

            <Link to={`/book-event/${event._id}`}
              className="flex items-center justify-center gap-2 w-full border-2 border-orange-400 text-orange-400 hover:bg-orange-50 py-3 rounded-xl font-semibold transition">
              Book This Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventDetails;
