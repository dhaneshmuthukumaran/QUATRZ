import { Link } from "react-router-dom";

export default function NotFound() {
  return <main className="dashboard not-found"><p className="eyebrow">COMMAND CENTER</p><h1>Page Not Found</h1><p className="subtitle">The requested command center page could not be found.</p><Link className="primary-button" to="/">Back to Dashboard</Link></main>;
}