import { useState, useEffect } from "react";
import { MapPin, CalendarDays, Tag, IndianRupee } from "lucide-react";
import { getEvents } from "../../services/eventService";

const fallbackImg = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = events.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Manage Events</h1>
          <p className="text-gray-400 text-sm mt-1">{events.length} events in the system</p>
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 w-56"
        />
      </div>

      {loading && <p className="text-gray-400 text-sm text-center py-16">Loading...</p>}
      {!loading && filtered.length === 0 && <p className="text-gray-400 text-sm text-center py-16">No events found.</p>}

      {!loading && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-gray-400 text-xs">
                  <th className="text-left px-6 py-4 font-medium">Event</th>
                  <th className="text-left px-6 py-4 font-medium">Category</th>
                  <th className="text-left px-6 py-4 font-medium">Location</th>
                  <th className="text-left px-6 py-4 font-medium">Date</th>
                  <th className="text-left px-6 py-4 font-medium">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((e) => (
                  <tr key={e._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={e.image || fallbackImg}
                          alt={e.name}
                          className="w-10 h-10 rounded-xl object-cover shrink-0"
                        />
                        <p className="font-semibold text-gray-800">{e.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <Tag size={12} /> {e.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <MapPin size={12} /> {e.location}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <CalendarDays size={12} /> {e.date?.slice(0, 10)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 font-semibold text-gray-800">
                        <IndianRupee size={13} />{e.price?.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageEvents;
