// src/context/useAuth.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import the context

// Custom hook to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
