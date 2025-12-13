export default function ProgressBar({ total, completed }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-4">
      <p className="text-sm text-slate-400 mb-1">
        Progress: {percentage}%
      </p>
      <div className="h-2 bg-slate-700 rounded">
        <div
          className="h-2 bg-primary rounded transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
