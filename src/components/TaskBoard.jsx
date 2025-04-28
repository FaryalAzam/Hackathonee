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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-400 via-pink-300 to-pink-500 py-10 px-4">
      <div className="bg-white w-full max-w-4xl p-8 rounded-3xl shadow-2xl">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">Task Board</h1>

        <input
          className="w-full p-4 mb-8 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
          placeholder="Search tasks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-6 mb-10">
          <input
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
            placeholder="New Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <textarea
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 resize-y min-h-[100px]"
            placeholder="Task Description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <input
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
            placeholder="Assign to"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
          />
          <select
            className="p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl transition transform hover:scale-105 shadow-md"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>

        <h2 className="text-3xl font-bold text-gray-700 mb-6">Tasks</h2>

        <div className="space-y-6">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-6 bg-gray-100 rounded-2xl shadow-md">
              {task.isEditing ? (
                <div className="space-y-4">
                  <input
                    className="w-full p-3 border border-gray-300 rounded-xl"
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
                    className="w-full p-3 border border-gray-300 rounded-xl min-h-[80px]"
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
                    className="w-full p-3 border border-gray-300 rounded-xl"
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
                    className="w-full p-3 border border-gray-300 rounded-xl"
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

                  <div className="flex gap-4">
                    <button
                      className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl"
                      onClick={() => handleEditTask(task.id, task)}
                    >
                      Save
                    </button>
                    <button
                      className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl"
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
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-gray-800">{task.title}</p>
                  <p className="text-gray-600">Assigned to: {task.assignedTo}</p>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-pink-600 font-semibold">Status: {task.status}</p>

                  <div className="flex gap-4 mt-4">
                    <button
                      className="flex-1 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white rounded-xl font-semibold"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="flex-1 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white rounded-xl font-semibold"
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
