import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets.js';
import Events from '../../components/Events.jsx';

const Dashboard = () => {
  const { dashboardData } = useContext(AdminContext);

  return (
    <div className="mt-5 mx-5 flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 bg-white p-4 min-w-44 md:min-w-52 rounded border-2 shadow border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.doctor_icon} alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData?.doctors}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 shadow border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointment_icon} alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData?.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 shadow border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="icon" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData?.users}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Events */}
      <Events />
    </div>
  );
};

export default Dashboard;
