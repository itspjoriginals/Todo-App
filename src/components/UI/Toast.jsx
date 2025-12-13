import { motion } from "framer-motion";

export default function Toast({ onUndo }) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 80, opacity: 0 }}
      className="fixed bottom-6 right-6 bg-[var(--card)] px-4 py-3 rounded-xl shadow-xl flex items-center gap-4"
    >
      <span className="text-sm">Task deleted</span>
      <button
        onClick={onUndo}
        className="text-primary font-semibold hover:underline"
      >
        Undo
      </button>
    </motion.div>
  );
}
