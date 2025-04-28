// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";  // Importing the AuthContext

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on component unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}
