import {
  LayoutDashboard,
  Projector,
  UserRoundPlus,
  UsersRound,
} from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-white border-r">
      <ul className="mt-5">
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-orange-500' : ''
            }`
          }
          to={'/admin-dashboard'}
        >
          <LayoutDashboard className="size-7 text-slate-700" />
          <p className="hidden md:block">DashBoard</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-orange-500' : ''
            }`
          }
          to={'/admin-appointments'}
        >
          <Projector className="size-7 text-slate-700" />
          <p className="hidden md:block">Appointments</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-orange-500' : ''
            }`
          }
          to={'/admin-add-doctor'}
        >
          <UserRoundPlus className="size-7 text-slate-700" />
          <p className="hidden md:block">Add Doctor</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
              isActive ? 'bg-[#F2F3FF] border-r-4 border-orange-500' : ''
            }`
          }
          to={'/admin-doctors-list'}
        >
          <UsersRound className="size-7 text-slate-700" />
          <p className="hidden md:block">Doctors</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
