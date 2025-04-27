import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return unsub;
  }, []);

  const handleAddTask = async () => {
    await addDoc(collection(db, "tasks"), {
      title: newTaskTitle,
      status: "To Do"
    });
    setNewTaskTitle("");
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const task = tasks.find(t => t.id === draggableId);
    if (task && destination.droppableId !== source.droppableId) {
      await updateDoc(doc(db, "tasks", draggableId), {
        status: destination.droppableId
      });
    }
  };

  const statuses = ["To Do", "In Progress", "Done"];

  return (
    <div>
      <input
        placeholder="New Task"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ width: "30%", minHeight: "500px", backgroundColor: "#f0f0f0", padding: "10px" }}
                >
                  <h3>{status}</h3>
                  {tasks.filter(task => task.status === status).map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          style={{ padding: "10px", backgroundColor: "#fff", marginBottom: "10px", ...provided.draggableProps.style }}
                        >
                          <p>{task.title}</p>
                          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}