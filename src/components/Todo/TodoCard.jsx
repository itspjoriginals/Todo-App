import { motion } from "framer-motion";

const PRIORITY_STYLES = {
  low: "bg-emerald-400",
  medium: "bg-yellow-400",
  high: "bg-red-400"
};

export default function TodoCard({ todo, dispatch, onDelete }) {
  const isOverdue =
    todo.dueDate &&
    !todo.completed &&
    new Date(todo.dueDate) < new Date();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`rounded-xl p-4 shadow-md bg-[var(--card)]
        ${isOverdue ? "border border-red-400" : ""}`}
    >
      <div className="flex justify-between items-start">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              dispatch({ type: "TOGGLE", payload: todo.id })
            }
            className="accent-primary w-4 h-4"
          />

          <span
            className={`${
              todo.completed
                ? "line-through text-slate-400"
                : ""
            }`}
          >
            {todo.title}
          </span>
        </label>

        <button
          onClick={() => onDelete(todo)}
          className="text-red-400 hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      <div className="flex justify-between items-center mt-3 text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${PRIORITY_STYLES[todo.priority]}`}
          />
          <span className="capitalize text-slate-400">
            {todo.priority}
          </span>
        </div>

        {todo.dueDate && (
          <span
            className={`${
              isOverdue ? "text-red-400" : "text-slate-400"
            }`}
          >
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      {isOverdue && (
        <p className="text-xs text-red-400 mt-2">⚠ Overdue</p>
      )}
    </motion.li>
  );
}
