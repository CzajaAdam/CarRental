import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { AdminLogin } from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
};
