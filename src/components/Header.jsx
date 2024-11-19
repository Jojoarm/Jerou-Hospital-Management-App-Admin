import { useContext } from 'react';
import Logo from './Logo';
import { AdminContext } from '../context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext.jsx';

const Header = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
    navigate('/login');
  };

  return (
    <div className="sticky top-0 flex justify-between items-center px-6 text-sm bg-white z-20 border-b border-gray-400">
      <Logo />
      <button
        onClick={logout}
        className="bg-orange-500 text-white text-sm px-4 md:px-10 py-1 md:py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
