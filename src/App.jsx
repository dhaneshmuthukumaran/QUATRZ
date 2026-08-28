import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import Incidents from "./pages/admin/incidents";
import SafetyManagement from "./pages/admin/SafetyManagement";
import Responders from "./pages/admin/Responders";
import NotFound from "./pages/NotFound";
import { AdminDataProvider } from "./context/AdminDataProvider";

function App() {
  return (
    <AdminDataProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/safety" element={<SafetyManagement />} />
            <Route path="/responders" element={<Responders />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminDataProvider>
  );
}

export default App;