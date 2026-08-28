export default function StatusBadge({ status }) {
  const className = status.toLowerCase();

  return (
    <span className={`status-badge ${className}`}>
      {status}
    </span>
  );
}