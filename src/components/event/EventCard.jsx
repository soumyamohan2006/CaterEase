import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className="h-48 bg-orange-200 flex items-center justify-center">
        <span className="text-orange-700">
          Event Image
        </span>
      </div>

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {event.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {event.description}
        </p>

        <p className="mt-3 font-semibold">
          📍 {event.location}
        </p>

        <Link
          to={`/events/${event._id}`}
          className="inline-block mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default EventCard;