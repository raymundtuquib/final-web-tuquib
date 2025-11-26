import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// <-- Put it here, right after imports
const API_URL = "https://final-web-backend.onrender.com";

interface Todo {
  id: number;
  task: string;
}

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const loadTodos = async () => {
    const res = await axios.get(API_URL); // use API_URL here
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, { task }); // use API_URL
      setEditId(null);
    } else {
      await axios.post(API_URL, { task }); // use API_URL
    }

    setTask("");
    loadTodos();
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`); // use API_URL
    loadTodos();
  };

  const startEdit = (todo: Todo) => {
    setTask(todo.task);
    setEditId(todo.id);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="container">
      <h1>Professional To-Do App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>{editId ? "Update" : "Add"}</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.task}</span>

            <div className="actions">
              <button className="edit" onClick={() => startEdit(todo)}>Edit</button>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
