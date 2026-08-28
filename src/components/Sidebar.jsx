import { NavLink } from "react-router-dom";

const menuItems = [["Dashboard", "/"], ["Incidents", "/incidents"], ["Safety Reports", "/safety"], ["Responders", "/responders"]];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar-label">WORKSPACE</p>
      {menuItems.map(([label, path]) => <NavLink key={path} to={path} end={path === "/"}>{label}</NavLink>)}
      <div className="sidebar-footer"><span className="shield-icon">+</span><div><strong>Response mode</strong><small>All systems operational</small></div></div>
    </aside>
  );
}