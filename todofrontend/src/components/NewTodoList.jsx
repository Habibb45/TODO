import { TodoItem } from "./NewTodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {Array.isArray(todos) && todos.map(todo => (
  <TodoItem
    title={todo.name}
    key={todo.id}
    toggleTodo={toggleTodo}
    deleteTodo={deleteTodo}
  />
))}
    </ul>
  )
}