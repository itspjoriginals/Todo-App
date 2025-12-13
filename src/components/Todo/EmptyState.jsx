import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center text-slate-400 mt-16"
    >
      <p className="text-lg">🎉 You’re all caught up!</p>
      <p className="text-sm mt-1">Add a task to get started.</p>
    </motion.div>
  );
}
