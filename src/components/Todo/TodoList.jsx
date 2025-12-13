import { AnimatePresence } from "framer-motion";
import TodoCard from "./TodoCard";

export default function TodoList({ todos, dispatch, onDelete }) {
  return (
    <ul className="space-y-3 mt-4">
      <AnimatePresence>
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            dispatch={dispatch}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
