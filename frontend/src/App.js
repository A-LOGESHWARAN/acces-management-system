import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import RequesterDashboard from "./dashboards/RequesterDashboard";
import ApproverDashboard from "./dashboards/ApproverDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";
import { setAuthToken } from "./api";

const token = localStorage.getItem("token");
if (token) setAuthToken(token);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/requester"
          element={
            <ProtectedRoute role="REQUESTER">
              <RequesterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/approver"
          element={
            <ProtectedRoute role="APPROVER">
              <ApproverDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
