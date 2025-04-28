import React, { useState } from "react";
import TaskCard from "./TaskCard";

function TaskBoard() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Finish React Project", assignedTo: "John Doe" },
    { id: "2", title: "Complete Task Tracker", assignedTo: "Jane Smith" },
  ]);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default TaskBoard;
