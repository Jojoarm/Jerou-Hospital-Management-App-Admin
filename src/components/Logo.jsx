import { useContext } from 'react';
import Jerou_logo from '../assets/Jerou_logo.jpg';
import { AdminContext } from '../context/AdminContext';

const Logo = () => {
  const { aToken } = useContext(AdminContext);
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-1 items-center">
        <img
          src={Jerou_logo}
          alt="logo"
          className="w-[60px] h-[60px] cursor-pointer"
        />
        <p className="font-semibold text-xs">Dashboard Panel</p>
      </div>
      <h2 className="border px-2.5 py-0.5 rounded-2xl text-xs md:text-sm md:bg-slate-600 md:text-white">
        {aToken ? 'Admin' : 'Doctor'}
      </h2>
    </div>
  );
};

export default Logo;
