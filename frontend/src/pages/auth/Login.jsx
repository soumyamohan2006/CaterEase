import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: "Demo User",
      email,
      role: "customer",
    };

    login(user);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mt-6"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mt-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg mt-6"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-600"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;