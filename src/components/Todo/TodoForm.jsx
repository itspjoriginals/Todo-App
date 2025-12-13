import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      priority,
      dueDate: dueDate || null
    });

    setTitle("");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[var(--card)] p-4 rounded-xl shadow-lg mb-6 space-y-3"
    >
      <Input
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="flex gap-3">
        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="bg-[var(--bg)] px-3 py-2 rounded-lg flex-1"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          className="bg-[var(--bg)] px-3 py-2 rounded-lg"
        />
      </div>

      <Button
        type="submit"
        className="
          w-full
          bg-[var(--primary)]
          text-[var(--bg)]
          font-semibold
          hover:shadow-lg hover:shadow-[var(--primary)]/40
        "
      >
        Add Task
      </Button>
    </motion.form>
  );
}
