import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForbiddenPage from "./pages/ForbiddenPage.jsx";
import Login from "./pages/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import StaffApp from "./pages/Staff/StaffApp.js";
import KioskApp from "./pages/KIOSK/src/KioskApp";
import StartPage from "./pages/KIOSK/src/Pages/StartPage";
import MainPage from "./pages/KIOSK/src/Pages/MainPage";
import DepartmentHeadApp from "./pages/DepartmentHead/DepartmentHeadApp";
import MonitorDisplay from "./pages/MonitorDisplay/src/MonitorDisplay";
import AddDeptHead from "./pages/Hardcoded Users/AddDeptHead.jsx";
import AddKioskUser from "./pages/Hardcoded Users/AddKioskUser.jsx";
import RoleProtectedRoute from "./middleware/RoleProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff/*" element={<StaffApp />} />

        <Route element={<RoleProtectedRoute allowedRoles={["kiosk"]} />}>
          <Route path="/kiosk/*" element={<KioskApp />} />
          <Route path="/startpage/*" element={<StartPage />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Route>

        <Route path="/departmenthead/*" element={<DepartmentHeadApp />} />
        <Route path="/monitordisplay/*" element={<MonitorDisplay />} />

        {/* for hard coding users */}
        <Route path="/add-dept-head" element={<AddDeptHead />} />
        <Route path="/add-kiosk" element={<AddKioskUser />} />
      </Routes>
    </Router>
  );
}

export default App;
