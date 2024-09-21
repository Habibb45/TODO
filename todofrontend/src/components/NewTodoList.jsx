import { TodoItem } from "./NewTodoItem";

export function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {Array.isArray(todos) &&
        todos.map((todo) => (
          <TodoItem 
            id={todo.id}
            title={todo.name}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            completed={todo.iscomplete}
          />
        ))}
    </ul>
  );
}
