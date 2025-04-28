import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-pink-500 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Welcome 🚀</h1>
        <p className="text-lg text-gray-600 mb-2">Hello World</p>
        <p className="text-lg text-gray-600 mb-8">
          Manage your tasks efficiently across stages: To Do, In Progress, Done.
        </p>

        <div className="flex gap-6 justify-center">
          <Link to="/signup">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
