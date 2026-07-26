import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="text-2xl font-bold text-orange-600"
      >
        CaterEase
      </Link>

      <div className="flex gap-6 items-center">

        <Link to="/" className="hover:text-orange-600">
          Home
        </Link>

        <Link to="/events" className="hover:text-orange-600">
          Events
        </Link>

        <Link to="/catering" className="hover:text-orange-600">
          Catering
        </Link>

        <Link to="/about" className="hover:text-orange-600">
          About
        </Link>

        {user ? (
          <>
            <Link
              to="/dashboard"
              className="hover:text-orange-600"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;