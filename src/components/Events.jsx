import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AdminContext } from '../context/AdminContext';
import { CircleX, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Events = () => {
  const { months, convertTime } = useContext(AppContext);
  const { events, backendUrl, aToken, getEvents } = useContext(AdminContext);
  const navigate = useNavigate();

  const deleteEvent = async (eventId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-event/${eventId}`,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        await getEvents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-start p-2 w-full md:w-[90%] md:p-10 rounded-2xl shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold">Upcoming Events</h2>
      <div className="flex flex-col gap-1 justify-start">
        {events.map((event, index) => (
          <div
            className="flex w-full justify-between items-start md:items-center p-2 hover:bg-slate-100 rounded-2xl"
            key={index}
          >
            <div className="flex items-start md:items-center gap-4 cursor-pointer hover:bg-slate-100 rounded-2xl">
              <div className="flex flex-col gap-0 md:gap-1 items-center justify-center text-white w-[70px] md:w-[100px] bg-blue-900 rounded-full py-1">
                <p className="text-sm capitalize">
                  {months[new Date(event.date).getMonth() + 1]}
                </p>
                <p className="text-xl md:text-3xl">
                  {new Date(event.date).getDate()}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-start">
                <p className="text-blue-900 font-semibold text-sm">
                  {event.title}
                </p>
                <p>
                  <span className="font-medium">Time:</span>{' '}
                  {convertTime(event.time)}
                </p>
              </div>
            </div>
            <div className="hidden md:flex gap-2 text-xs">
              <p
                className="text-green-500 cursor-pointer hover:text-white hover:bg-green-500 border border-green-500 rounded-xl py-1 px-4 shadow"
                onClick={() => {
                  navigate(`/admin-update-event/${event._id}`);
                  scrollTo(0, 0);
                }}
              >
                Edit
              </p>
              <p
                className="text-red-500 cursor-pointer hover:text-white hover:bg-red-500 border border-red-500 rounded-xl py-1 px-2 shadow"
                onClick={() => deleteEvent(event._id)}
              >
                Delete
              </p>
            </div>
            <div className="flex md:hidden gap-2 text-sm">
              <Pencil
                className="text-gray-500 cursor-pointer size-4"
                onClick={() => {
                  navigate(`/admin-update-event/${event._id}`);
                  scrollTo(0, 0);
                }}
              />
              <CircleX
                className="text-red-500 cursor-pointer size-4"
                onClick={() => deleteEvent(event._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
