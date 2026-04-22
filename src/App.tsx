import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { User } from './pages/User';
import { Admin } from './pages/Admin';
import { AdminLogin } from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import { RentCar } from './pages/RentCar';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/rent" element={<RentCar />} />

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
