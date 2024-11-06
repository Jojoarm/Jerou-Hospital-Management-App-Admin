import { useContext } from 'react';
import Logo from './Logo';
import { AdminContext } from '../context/AdminContext.jsx';

const Header = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  //   const { dToken, setDToken } = useContext(DoctorContext);

  const logout = () => {
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
    // dToken && setDToken('');
    // dToken && localStorage.removeItem('dToken');
  };

  return (
    <div className="flex justify-between items-center px-6 text-sm bg-white border-b border-gray-400">
      <Logo />
      <button
        onClick={logout}
        className="bg-orange-500 text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
