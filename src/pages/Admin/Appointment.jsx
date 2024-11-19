import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Appointment = () => {
  const { appointments } = useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);

  return (
    <div className="mt-5 flex flex-col gap-3 items-center justify-center px-4 w-full">
      <h2 className="text-2xl font-semibold">All Appointments</h2>
      <div className="bg-white border rounded-xl shadow min-h-[60vh] max-h-[80vh] w-[100%] overflow-auto text-xs md:text-sm">
        <div className="sticky top-0 bg-white grid grid-cols-[0.5fr_2fr_3fr_1fr] gap-3 p-4 border-b font-semibold text-base">
          <p>#</p>
          <p>Patient Details</p>
          <p>Doctor Details</p>
          <p>Status</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_3fr_1fr] gap-3 items-start justify-start p-4 border-b text-gray-500 hover:bg-gray-50"
          >
            <p>{index + 1}</p>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img
                  className="size-4 md:size-6 rounded-full"
                  src={item.userData.image}
                  alt="profile picture"
                />
                <p className="font-semibold">{item.userData.name}</p>
              </div>
              <p>
                <span className="font-medium">Age: </span>{' '}
                {calculateAge(item.userData.dob)} Years
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <img
                  className="size-4 md:size-6 rounded-full"
                  src={item.docData.image}
                  alt="profile picture"
                />
                <p className="font-semibold">{item.docData.name}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                <p>
                  <span className="font-medium">Date: </span>
                  {slotDateFormat(item.slotDate)}
                </p>
                <p>
                  <span className="font-medium">Time: </span>
                  {item.slotTime}
                </p>
              </div>
              <p>
                <span className="font-medium">Fee: </span>&#8358;{' '}
                {item.docData.fee}
              </p>
            </div>

            {item.cancelled ? (
              <p className="text-red-400 font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-600 font-medium">Completed</p>
            ) : (
              <p className="text-green-400 font-medium">Booked</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
