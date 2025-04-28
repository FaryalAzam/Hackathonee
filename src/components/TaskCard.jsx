// src/components/TaskCard.jsx
import React from "react";

export default function TaskCard({ task, onDelete }) {
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        marginBottom: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h4>{task.title}</h4>
      {task.assignedTo && <p>Assigned to: {task.assignedTo}</p>}
      <button onClick={() => onDelete(task.id)} style={{ marginTop: "10px" }}>
        Delete
      </button>
    </div>
  );
}
