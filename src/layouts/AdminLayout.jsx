import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="content-layout">
        <Sidebar />

        <Outlet />
      </div>
    </div>
  );
}