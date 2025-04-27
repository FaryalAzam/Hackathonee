import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const tasksCollection = await getDocs(collection(db, "tasks"));
    setTasks(tasksCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    await addDoc(collection(db, "tasks"), {
      title,
      description,
      assignedTo,
      status: "todo"
    });
    fetchTasks();
    setTitle("");
    setDescription("");
    setAssignedTo("");
  };

  const updateTaskStatus = async (id, status) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    fetchTasks();
  };

  return (
    <div>
      <h2>Task Board</h2>

      <div>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input placeholder="Assigned To" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
        <button onClick={createTask}>Create Task</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {["todo", "inprogress", "done"].map((status) => (
          <div key={status} style={{ width: "30%" }}>
            <h3>{status.toUpperCase()}</h3>
            {tasks.filter(task => task.status === status).map(task => (
              <div key={task.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                <h4>{task.title}</h4>
                <p>Assigned: {task.assignedTo}</p>
                <button onClick={() => updateTaskStatus(task.id, status === "todo" ? "inprogress" : "done")}>
                  Move Forward
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task;


