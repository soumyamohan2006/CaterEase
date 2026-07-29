import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../../services/eventService";
import { useAuth } from "../../hooks/useAuth";

function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEventById(id)
      .then(setEvent)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!event) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="h-64 bg-orange-200 rounded-xl flex items-center justify-center mb-8">
        <span className="text-orange-700 text-xl">Event Image</span>
      </div>

      <h1 className="text-4xl font-bold">{event.name}</h1>
      <p className="text-gray-500 mt-4">{event.description}</p>

      <div className="mt-6 space-y-2 text-gray-700">
        <p>📍 {event.location}</p>
        <p>📅 {new Date(event.date).toLocaleDateString()}</p>
        <p>🏷️ {event.category}</p>
        <p className="text-orange-600 font-bold text-xl">
          ₹{event.price?.toLocaleString()}
        </p>
      </div>

      {user ? (
        <Link
          to={`/book-event/${event._id}`}
          className="inline-block mt-8 bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          Book This Event
        </Link>
      ) : (
        <Link
          to="/login"
          className="inline-block mt-8 bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          Login to Book
        </Link>
      )}
    </div>
  );
}

export default EventDetails;
