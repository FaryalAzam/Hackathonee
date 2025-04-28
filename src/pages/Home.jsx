import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Mini Task Tracker 🚀</h1>
      <p style={styles.text}>Hello World</p>
      <p style={styles.text}>
        Manage your tasks efficiently across stages: To Do, In Progress, Done.
      </p>

      <div style={styles.buttonContainer}>
        <Link to="/signup">
          <button style={styles.button}>Sign Up</button>
        </Link>
        <Link to="/login">
          <button style={styles.button}>Login</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    padding: "50px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "20px",
  },
  buttonContainer: {
    marginTop: "30px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#696cff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "10px",
  },
};
