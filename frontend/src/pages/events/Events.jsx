import { useState, useEffect } from "react";
import EventCard from "../../components/event/EventCard";
import { getEvents } from "../../services/eventService";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-20">Loading events...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-10 py-12">
      <h1 className="text-4xl font-bold">Explore Events</h1>
      <p className="text-gray-500 mt-2">
        Find the perfect event services for your occasion.
      </p>

      {events.length === 0 ? (
        <p className="text-center py-20 text-gray-400">No events available.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
