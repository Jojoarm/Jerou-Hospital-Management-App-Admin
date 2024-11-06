import { useContext, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AdminContext } from './context/AdminContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import Appointment from './pages/Admin/Appointment';
import AddDoctor from './pages/Admin/AddDoctor';
import Doctors from './pages/Admin/Doctors';

function App() {
  const { aToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const AdminProtectedRoutes = ({ children }) => {
    if (!aToken) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  useEffect(() => {
    if (!aToken) {
      navigate('/login');
    }
  }, []);

  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Header />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route
            path="/admin-dashboard"
            element={
              <AdminProtectedRoutes>
                <Dashboard />
              </AdminProtectedRoutes>
            }
          />
          <Route
            path="/admin-appointments"
            element={
              <AdminProtectedRoutes>
                <Appointment />
              </AdminProtectedRoutes>
            }
          />
          <Route
            path="/admin-add-doctor"
            element={
              <AdminProtectedRoutes>
                <AddDoctor />
              </AdminProtectedRoutes>
            }
          />
          <Route
            path="/admin-doctors-list"
            element={
              <AdminProtectedRoutes>
                <Doctors />
              </AdminProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
