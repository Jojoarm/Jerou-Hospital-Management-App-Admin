import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import { assets } from '../../assets/assets';
import Posts from '../../components/Posts';

const DoctorDashboard = () => {
  const { docDashData, isLoading } = useContext(DoctorContext);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="mt-5 mx-5 flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 bg-white p-4 min-w-44 md:min-w-52 rounded border-2 shadow border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} alt="icon" />
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold text-gray-600">
              &#8358; {docDashData?.dashData?.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 shadow border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointment_icon} alt="icon" />
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold text-gray-600">
              {docDashData?.dashData?.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 shadow border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="icon" />
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold text-gray-600">
              {docDashData?.dashData?.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Posts */}
      <Posts />
    </div>
  );
};

export default DoctorDashboard;
