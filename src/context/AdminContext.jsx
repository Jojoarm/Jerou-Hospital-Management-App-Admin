import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem('aToken') ? localStorage.getItem('aToken') : ''
  );
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [events, setEvents] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const adminSignup = async (name, email, password, adminKey) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/admin/signup`, {
        name,
        email,
        password,
        adminKey,
      });

      if (data.success) {
        setIsLoading(false);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const adminLogin = async (email, password, adminKey) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
        adminKey,
      });

      if (data.success) {
        setIsLoading(false);
        localStorage.setItem('aToken', data.token);
        setAToken(data.token);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const getAdmin = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/profile`, {
        headers: { aToken },
      });
      if (data.success) {
        setAdmin(data.admin);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const addDoctor = async (
    name,
    email,
    password,
    docImg,
    experience,
    fee,
    about,
    speciality,
    qualification,
    address
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        {
          name,
          email,
          password,
          docImg,
          experience,
          fee,
          about,
          speciality,
          qualification,
          address,
        },
        { headers: { aToken } }
      );

      if (data.success) {
        setIsLoading(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const getDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/doctors`, {
        headers: { aToken },
      });
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: { aToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/dashboard-data`,
        {
          headers: { aToken },
        }
      );

      if (data.success) {
        setDashboardData(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getEvents = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/events`);
      if (data.success) {
        setEvents(data.events);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const value = {
    aToken,
    setAToken,
    isLoading,
    setIsLoading,
    admin,
    setAdmin,
    backendUrl,
    adminSignup,
    adminLogin,
    getAdmin,
    addDoctor,
    getDoctors,
    doctors,
    getAppointments,
    appointments,
    dashboardData,
    getDashboardData,
    getEvents,
    events,
  };

  useEffect(() => {
    if (aToken) {
      getDoctors();
    }
  }, [aToken]);

  useEffect(() => {
    if (aToken) {
      getAppointments();
      getDashboardData();
      getEvents();
    }
  }, [aToken]);

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
