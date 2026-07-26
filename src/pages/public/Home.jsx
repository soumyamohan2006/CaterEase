import { Link } from "react-router-dom";
import Footer from "../../components/common/Footer";

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-orange-50 min-h-[600px] flex items-center">

        <div className="max-w-7xl mx-auto w-full px-10 grid md:grid-cols-2 gap-10 items-center">

          <div>

            <p className="text-orange-600 font-semibold mb-4">
              COMPLETE EVENT SOLUTION
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Create unforgettable events with
              <span className="text-orange-600">
                {" "}perfect catering
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Plan your events, discover catering packages,
              and manage your entire event from one platform.
            </p>

            <div className="mt-8 flex gap-4">

              <Link
                to="/events"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg"
              >
                Explore Events
              </Link>

              <Link
                to="/catering"
                className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg"
              >
                View Catering
              </Link>

            </div>

          </div>

          <div className="bg-orange-200 rounded-3xl h-96 flex items-center justify-center">

            <h2 className="text-3xl font-bold text-orange-800">
              Your Event. Your Experience.
            </h2>

          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Home;