import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserLogin from "./pages/UserLogin";
import DoctorLogin from "./pages/DoctorLogin";
import UserRegister from "./pages/UserRegister";
import DoctorRegister from "./pages/DoctorRegister";
import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
