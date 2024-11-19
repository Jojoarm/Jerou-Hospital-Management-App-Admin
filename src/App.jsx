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
import AddEvent from './pages/Admin/AddEvent';
import UpdateEvent from './pages/Admin/UpdateEvent';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import AddPost from './pages/Doctor/AddPost';
import UpdatePost from './pages/Doctor/UpdatePost';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';

function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const AdminProtectedRoutes = ({ children }) => {
    if (!aToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  const DoctorProtectedRoutes = ({ children }) => {
    if (!dToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  useEffect(() => {
    if (!aToken || !dToken) navigate('/login');
  }, [aToken, dToken]);

  return aToken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <Header />
      <ToastContainer />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          {/* Admin Routes */}
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
          <Route
            path="/admin-add-event"
            element={
              <AdminProtectedRoutes>
                <AddEvent />
              </AdminProtectedRoutes>
            }
          />
          <Route
            path="/admin-update-event/:eventId"
            element={
              <AdminProtectedRoutes>
                <UpdateEvent />
              </AdminProtectedRoutes>
            }
          />

          {/* Doctor routes */}
          <Route
            path="/doctor-dashboard"
            element={
              <DoctorProtectedRoutes>
                <DoctorDashboard />
              </DoctorProtectedRoutes>
            }
          />
          <Route
            path="/doctor-profile"
            element={
              <DoctorProtectedRoutes>
                <DoctorProfile />
              </DoctorProtectedRoutes>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <DoctorProtectedRoutes>
                <DoctorAppointments />
              </DoctorProtectedRoutes>
            }
          />
          <Route
            path="/add-post"
            element={
              <DoctorProtectedRoutes>
                <AddPost />
              </DoctorProtectedRoutes>
            }
          />
          <Route
            path="/doctor-update-post/:postId"
            element={
              <DoctorProtectedRoutes>
                <UpdatePost />
              </DoctorProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
