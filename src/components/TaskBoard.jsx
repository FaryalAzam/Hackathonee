import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [assignedUser, setAssignedUser] = useState(""); 
  const [taskStatus, setTaskStatus] = useState("To Do"); 
  const [filter, setFilter] = useState(""); 

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsub;
  }, []);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !newTaskDescription.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title: newTaskTitle,
        description: newTaskDescription,
        assignedTo: assignedUser,
        status: taskStatus,
      });

      setNewTaskTitle("");
      setNewTaskDescription("");
      setAssignedUser("");
      setTaskStatus("To Do");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const handleEditTask = async (id, updatedTask) => {
    if (!updatedTask.title.trim() || !updatedTask.description.trim()) return;

    await updateDoc(doc(db, "tasks", id), {
      title: updatedTask.title,
      description: updatedTask.description,
      assignedTo: updatedTask.assignedTo,
      status: updatedTask.status,
    });
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filter.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="task-board-container">
      <h1 className="title">Task Board</h1>

      <input
        className="search-input"
        placeholder="Search tasks"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="task-input-section">
        <input
          className="task-input"
          placeholder="New Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <textarea
          className="task-textarea"
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <input
          className="task-input"
          placeholder="Assign to"
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
        />
        <select
          className="task-select"
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button className="add-task-btn" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <div className="tasks-list">
        <h2 className="task-list-title">Tasks</h2>
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-card">
            {task.isEditing ? (
              <div className="task-edit-form">
                <input
                  className="task-input"
                  value={task.title}
                  onChange={(e) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, title: e.target.value } : t
                      )
                    )
                  }
                />
                <textarea
                  className="task-textarea"
                  value={task.description}
                  onChange={(e) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, description: e.target.value } : t
                      )
                    )
                  }
                />
                <input
                  className="task-input"
                  value={task.assignedTo}
                  onChange={(e) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, assignedTo: e.target.value } : t
                      )
                    )
                  }
                />
                <select
                  className="task-select"
                  value={task.status}
                  onChange={(e) =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, status: e.target.value } : t
                      )
                    )
                  }
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                <button className="save-btn" onClick={() => handleEditTask(task.id, task)}>
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, isEditing: false } : t
                      )
                    )
                  }
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="task-details">
                <p className="task-title">{task.title}</p>
                <p className="assigned-user">Assigned to: {task.assignedTo}</p>
                <p className="task-description">{task.description}</p>
                <p className="task-status">Status: {task.status}</p>
                <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
                <button
                  className="edit-btn"
                  onClick={() =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, isEditing: true } : t
                      )
                    )
                  }
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .task-board-container {
          padding: 20px;
          max-width: 900px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 2.5rem;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        .search-input {
          padding: 10px;
          width: 100%;
          max-width: 500px;
          margin-bottom: 20px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .task-input-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
          max-width: 500px;
          margin: 0 auto;
        }

        .task-input,
        .task-textarea,
        .task-select {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        .task-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .add-task-btn {
          padding: 12px 20px;
          background-color: #696cff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
        }

        .add-task-btn:hover {
          background-color: #5850e6;
        }

        .tasks-list {
          margin-top: 30px;
        }

        .task-card {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 15px;
        }

        .task-title {
          font-size: 1.3rem;
          font-weight: bold;
        }

        .assigned-user,
        .task-description,
        .task-status {
          font-size: 1rem;
          color: #555;
        }

        .delete-btn,
        .edit-btn {
          padding: 8px 15px;
          margin-right: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .delete-btn {
          background-color: #e57373;
          color: white;
        }

        .edit-btn {
          background-color: #ffd54f;
          color: white;
        }

        .delete-btn:hover {
          background-color: #d32f2f;
        }

        .edit-btn:hover {
          background-color: #fbc02d;
        }

        .task-edit-form input,
        .task-edit-form textarea {
          margin-bottom: 10px;
        }

        .save-btn,
        .cancel-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .save-btn {
          background-color: #4caf50;
          color: white;
        }

        .cancel-btn {
          background-color: #f44336;
          color: white;
        }

        .save-btn:hover {
          background-color: #45a049;
        }

        .cancel-btn:hover {
          background-color: #e53935;
        }
      `}</style>
    </div>
  );
}
