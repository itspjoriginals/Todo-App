import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "../reducers/todoReducer";
import { loadTodos, saveTodos } from "../utils/storage";

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, [], loadTodos);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // 🔥 Undo Delete state
  const [deletedTodo, setDeletedTodo] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo({ title, priority, dueDate }) {
    dispatch({
      type: "ADD",
      payload: {
        id: crypto.randomUUID(),
        title,
        completed: false,
        priority,
        dueDate,
        createdAt: Date.now()
      }
    });
  }

  function deleteTodo(todo) {
    setDeletedTodo(todo);
    setShowToast(true);

    dispatch({ type: "DELETE", payload: todo.id });

    setTimeout(() => {
      setShowToast(false);
      setDeletedTodo(null);
    }, 5000);
  }

  function undoDelete() {
    if (!deletedTodo) return;

    dispatch({ type: "RESTORE", payload: deletedTodo });
    setDeletedTodo(null);
    setShowToast(false);
  }

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.completed) ||
      (filter === "completed" && todo.completed);

    return matchesSearch && matchesFilter;
  });

  return {
    todos: filteredTodos,
    totalTodos: todos.length,
    completedTodos: todos.filter(t => t.completed).length,
    setFilter,
    setSearch,
    addTodo,
    deleteTodo,
    undoDelete,
    showToast,
    dispatch
  };
}
