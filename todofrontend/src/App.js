import { useEffect, useState } from "react";
import { NewTodoForm } from "./components/NewTodoFormt";
import "./App.css";
import { TodoList } from "./components/NewTodoList";
import { getData, addData, deleteData, toggleData } from "./apis/api";

export default function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend on initial load
  useEffect(() => {
    async function fetchTodos() {
      const data = await getData();
      if (data) {
        setTodos(data);
      }
    }

    fetchTodos();
  }, []);

  // Add new todo
  async function handleAddTodo(title) {
    const newTodo = await addData(title);
    if (newTodo) {
      setTodos((currentTodos) => [...currentTodos, newTodo]);
    }
  }

  // Toggle todo's completed status
  async function handleToggleTodo(id) {
    const updatedTodo = await toggleData(id);
    if (updatedTodo) {
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    }
    window.location.reload();
  }

  // Delete todo
  async function handleDeleteTodo(id) {
    const success = await deleteData(id);
    if (success) {
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    }
  }

  return (
    <>
      <NewTodoForm onSubmit={handleAddTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList
        todos={todos}
        toggleTodo={handleToggleTodo}
        deleteTodo={handleDeleteTodo}
      />
    </>
  );
}
