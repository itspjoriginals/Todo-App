// import { NewTodoForm } from "./NewTodoForm";
// import "./styles.css";
// import { useState, useEffect } from "react";
// import { TodoList } from "./TodoList";


// export default function App() {
//   const [todos, setTodos] = useState(()=> {
//     const localValue = localStorage.getItem("ITEMS");
//     if(localValue == null) return [];
//     return JSON.parse(localValue);
//   });

//   useEffect(() => {
//     localStorage.setItem("ITEMS", JSON.stringify(todos))
//   }, [todos])
  

//   function addTodo(title){
//      setTodos((currentTodos) =>{
//       return [
//       ...currentTodos, { id: crypto.randomUUID(), title, completed: false },
//     ]
//     })
//   }

//   function toggleTodo(id, completed){
//     setTodos(currentTodos => {
//       return currentTodos.map(todo =>{
//         if(todo.id === id){
//           return {...todo, completed}
//         }

//         return todo
//       })
//     })
//   }
  
//   function deleteTodo(id){
//     setTodos(currentTodos => {
//       return currentTodos.filter(todo => todo.id !==id)
//     })
//   }

//   return (
//     <>
//       <NewTodoForm onSubmit={addTodo}/> 

//       <h1 className="header">Todo List</h1>
//       <TodoList todos ={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
//     </>

//   )
// }

import { useTodos } from "./hooks/useTodos";
import { useTheme } from "./hooks/useTheme";
import TodoForm from "./components/Todo/TodoForm";
import TodoList from "./components/Todo/TodoList";
import Toast from "./components/UI/Toast";
import CursorParticles from "./components/UI/CursorParticles";

export default function App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    undoDelete,
    showToast,
    dispatch
  } = useTodos();

  const { theme, setTheme } = useTheme();

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      {/* 🔥 Cursor Particle Effect (GLOBAL) */}
      <CursorParticles />

      <div className="max-w-xl mx-auto relative z-10">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">TaskFlow</h1>

          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="px-3 py-1 rounded-lg bg-[var(--card)]"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        <TodoForm onAdd={addTodo} />

        <TodoList
          todos={todos}
          dispatch={dispatch}
          onDelete={deleteTodo}
        />
      </div>

      {showToast && <Toast onUndo={undoDelete} />}
    </div>
  );
}
