export default function TodoFilters({ setFilter, setSearch }) {
  return (
    <div className="flex gap-3 mb-4">
      <select
        onChange={e => setFilter(e.target.value)}
        className="bg-[var(--card)] px-3 py-2 rounded-lg"
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <input
        placeholder="Search tasks..."
        onChange={e => setSearch(e.target.value)}
        className="flex-1 bg-[var(--card)] px-3 py-2 rounded-lg"
      />
    </div>
  );
}
