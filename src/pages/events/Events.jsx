import EventCard from "../../components/event/EventCard";

function Events() {

  const events = [
    {
      _id: "1",
      name: "Wedding Events",
      description: "Complete wedding event management.",
      location: "Kerala",
    },
    {
      _id: "2",
      name: "Birthday Parties",
      description: "Make your birthday celebrations special.",
      location: "Kochi",
    },
    {
      _id: "3",
      name: "Corporate Events",
      description: "Professional corporate event planning.",
      location: "Thrissur",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-10 py-12">

      <h1 className="text-4xl font-bold">
        Explore Events
      </h1>

      <p className="text-gray-500 mt-2">
        Find the perfect event services for your occasion.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))}

      </div>

    </div>
  );
}

export default Events;