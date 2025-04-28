import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // to track loading state
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Start loading when submitting

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use. Please use a different one.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // End loading after submission
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-pink-500 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Sign Up</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
            required
          />

          <button
            type="submit"
            className={`w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-md ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
