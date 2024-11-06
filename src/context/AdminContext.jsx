import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem('aToken') ? localStorage.getItem('aToken') : ''
  );
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;