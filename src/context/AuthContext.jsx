// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase"; // correct firebase import (without /config)
import { onAuthStateChanged } from "firebase/auth";

// Context create
const AuthContext = createContext();

// Custom hook for using auth
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
