import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem('dToken') ? localStorage.getItem('dToken') : ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [docDashData, setDocDashData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [docAppointments, setDocAppointments] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const doctorLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
        email,
        password,
      });
      if (data.success) {
        setIsLoading(false);
        localStorage.setItem('dToken', data.token);
        setDToken(data.token);
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

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/dashboard-data`,
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        console.log(data);
        setDocDashData(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/posts`, {
        headers: { dToken },
      });
      if (data.success) {
        setPosts(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getDoctorAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments`,
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        setDocAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    isLoading,
    setIsLoading,
    dToken,
    setDToken,
    doctorLogin,
    docDashData,
    backendUrl,
    getPosts,
    setPosts,
    posts,
    docAppointments,
    setDocAppointments,
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment,
  };

  useEffect(() => {
    if (dToken) {
      getDashboardData();
      getPosts();
      getDoctorAppointments();
    }
  }, [dToken]);

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
