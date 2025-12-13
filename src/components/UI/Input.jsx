export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`
        w-full rounded-lg px-3 py-2
        bg-[var(--card)]
        border border-slate-600
        focus:outline-none focus:ring-2 focus:ring-primary
        transition
        ${className}
      `}
    />
  );
}
