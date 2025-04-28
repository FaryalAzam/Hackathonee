// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from "../../firebase"; // ✅ correct path
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignUp = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert('Sign up successful!');
//       navigate('/login');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignUp}>Sign Up</button>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To handle page redirection
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation to another page
  const auth = getAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // On successful signup, navigate to the dashboard
      navigate("/dashboard"); // Redirect to the dashboard page (change the route if needed)
    } catch (error) {
      // Handle errors from Firebase
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use. Please use a different one.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {/* Show error message if any */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <style jsx>{`
        .signup-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f9;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          font-size: 1rem;
          color: #333;
          margin-bottom: 5px;
          display: block;
        }

        .form-group input {
          width: 100%;
          padding: 8px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }

        .error-message {
          color: red;
          margin-bottom: 20px;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
