import {
  Activity,
  LayoutDashboard,
  Projector,
  UserRoundPlus,
  UsersRound,
} from 'lucide-react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  return (
    <div className="sticky top-20 min-h-screen bg-white border-r">
      {aToken && (
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
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-orange-500' : ''
              }`
            }
            to={'/admin-add-event'}
          >
            <Activity className="size-7 text-slate-700" />
            <p className="hidden md:block">Add Event</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-orange-500' : ''
              }`
            }
            to={'/doctor-dashboard'}
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
            to={'/doctor-appointments'}
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
            to={'/doctor-profile'}
          >
            <UsersRound className="size-7 text-slate-700" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#F2F3FF] border-r-4 border-orange-500' : ''
              }`
            }
            to={'/add-post'}
          >
            <Activity className="size-7 text-slate-700" />
            <p className="hidden md:block">Add Health Post</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
