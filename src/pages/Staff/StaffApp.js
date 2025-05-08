import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./StaffApp.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Reports from "./pages/Reports";
import Managequeue from "./pages/Managequeue";
import Settings from "./pages/Settings";
import NULogo from "../../../src/images/NULogo.png";
import userImage from "../../../src/images/user.png";
import { RiEyeLine, RiEyeOffLine, RiCameraLine } from "react-icons/ri";
import RoleProtectedRoute from "../../middleware/RoleProtectedRoute";

function StaffApp() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [windowNumber, setWindowNumber] = useState("");
  const [selectedWindow, setSelectedWindow] = useState("");
  const [availableWindows, setAvailableWindows] = useState([1, 2, 3, 4, 5]);
  const [assignedWindows, setAssignedWindows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const checkUserWindow = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const user = JSON.parse(atob(token.split(".")[1]));
    console.log(user);
    return user?.windowNumber;
  };

  useEffect(() => {
    if (!checkUserWindow()) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, []);

  const fetchAssignedWindows = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/windows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const assignments = data.windowAssignments || [];
      const assignedWindowNumbers = assignments.map((a) =>
        parseInt(a.windowNumber)
      );
      setAssignedWindows(assignedWindowNumbers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching window assignments:", error);
      setAssignedWindows([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedWindows();
    const intervalId = setInterval(fetchAssignedWindows, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const user = JSON.parse(atob(token.split(".")[1]));
      setWindowNumber(user?.windowNumber || "");
    } catch (e) {
      console.error("Invalid token", e);
    }
  }, []);

  const handleConfirm = async () => {
    try {
      setErrorMessage("");

      if (isWindowAssigned(selectedWindow)) {
        setErrorMessage(
          "This window is already in use. Please select another window."
        );
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/auth/assign-window",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            windowNumber: selectedWindow,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to assign window");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setWindowNumber(selectedWindow);
      setShowDialog(false);
    } catch (error) {
      console.error("Error assigning window:", error);
      setErrorMessage(
        "This window is unavailable. Please select another window."
      );
    }
  };

  const handleWindowChange = (e) => {
    const windowNum = e.target.value;
    setSelectedWindow(windowNum);

    if (isWindowAssigned(windowNum)) {
      setErrorMessage(
        "This window is already in use. Please select another window."
      );
    } else {
      if (errorMessage) {
        setErrorMessage("");
      }
    }
  };

  const isWindowAssigned = (windowNum) => {
    if (!windowNum) return false;
    const userWindow = checkUserWindow();
    if (parseInt(windowNum) === parseInt(userWindow)) return false; // allow own window
    return assignedWindows.includes(parseInt(windowNum));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SideBar />
      {showDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
              width: "400px",
              fontFamily: "Clan OT, sans-serif",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "22px", color: "#35408E" }}>
                Select Window Number
              </h2>
              <img
                src={NULogo}
                alt="NU Logo"
                style={{ height: "50px", width: "auto" }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <label
                htmlFor="window-select"
                style={{
                  fontSize: "16px",
                  color: "#35408E",
                  marginBottom: "10px",
                  display: "block",
                }}
              >
                Choose Window Number:
              </label>
              <select
                id="window-select"
                value={selectedWindow}
                onChange={handleWindowChange}
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "18px",
                  padding: "8px",
                  border: "2px solid #35408E",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
                disabled={loading}
              >
                <option value="">Select a window number</option>
                {availableWindows.map((num) => {
                  const assigned = isWindowAssigned(num);
                  return (
                    <option
                      key={num}
                      value={num}
                      disabled={assigned}
                      style={{
                        color: assigned ? "#999" : "#000",
                        backgroundColor: assigned ? "#f0f0f0" : "white",
                        fontStyle: assigned ? "italic" : "normal",
                      }}
                    >
                      Window {num} {assigned ? "(In Use)" : ""}
                    </option>
                  );
                })}
              </select>
              {errorMessage && (
                <div
                  style={{
                    color: "#FF0000",
                    fontSize: "14px",
                    marginTop: "8px",
                    padding: "5px",
                  }}
                >
                  {errorMessage}
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
              }}
            >
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#35408E",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                  borderRadius: "20px",
                  width: "45%",
                }}
                onClick={() => {
                  setSelectedWindow("");
                  setErrorMessage("");
                }}
              >
                Clear
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#35408E",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "18px",
                  cursor: "pointer",
                  borderRadius: "20px",
                  width: "45%",
                  opacity:
                    selectedWindow && !isWindowAssigned(selectedWindow)
                      ? "1"
                      : "0.5",
                  pointerEvents:
                    selectedWindow && !isWindowAssigned(selectedWindow)
                      ? "auto"
                      : "none",
                }}
                onClick={handleConfirm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="flex-1 w-full max-w-[100rem] mx-auto">
        <Routes>
          <Route element={<RoleProtectedRoute allowedRoles={["staff"]} />}>
            <Route path="/" element={<Navigate to="/staff/managequeue" />} />
            <Route
              path="/managequeue"
              element={<Managequeue windowNumber={windowNumber} />}
            />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default StaffApp;
