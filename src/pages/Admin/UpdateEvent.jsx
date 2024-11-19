import axios from 'axios';
import {
  Calendar1,
  Captions,
  CircleDollarSign,
  Clock,
  Loader,
  LogIn,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

const UpdateEvent = () => {
  const { backendUrl, aToken, getEvents } = useContext(AdminContext);
  const [image, setImage] = useState(false);
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const getEvent = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/admin/event/${eventId}`
      );
      if (data.success) {
        setIsLoading(false);
        setEvent(data.event);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', event.title);
      formData.append('description', event.description);
      formData.append('date', event.date);
      formData.append('time', event.time);
      formData.append('registration', event.registration);
      formData.append('fee', event.fee);
      image && formData.append('image', image);

      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/admin/edit-event/${eventId}`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        await getEvents();
        setIsLoading(false);
        setImage(false);
        navigate('/admin-dashboard');
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="mt-5">
      <form
        className="p-5 text-neutral-700 w-full"
        onSubmit={handleUpdateEvent}
      >
        <div className=" w-full p-5 max-w-4xl bg-white border-x-2 border-slate-300 rounded-xl shadow ">
          <h2 className="text-center font-semibold text-xl">Update Event</h2>
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  className="w-36 rounded opacity-75"
                  src={image ? URL.createObjectURL(image) : event.image}
                  alt=""
                />
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={image ? '' : assets.upload_icon}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 items-start ">
            <div className="w-full lg:flex-1 flex flex-col gap-2">
              <p>Title:</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Captions className="size-5 text-orange-500" />
                </div>
                <input
                  type="text"
                  placeholder="Event Title"
                  value={event.title}
                  onChange={(e) =>
                    setEvent((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-2">
              <p>Fee:</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <CircleDollarSign className="size-5 text-orange-500" />
                </div>
                <input
                  type="number"
                  placeholder="Event Fee"
                  value={event.fee}
                  onChange={(e) =>
                    setEvent((prev) => ({ ...prev, fee: e.target.value }))
                  }
                  className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-2">
              <p>Event Date:</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar1 className="size-5 text-orange-500" />
                </div>
                <input
                  type="date"
                  placeholder="Event Date"
                  value={event.date}
                  onChange={(e) =>
                    setEvent((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-2">
              <p>Event Time:</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Clock className="size-5 text-orange-500" />
                </div>
                <input
                  type="time"
                  placeholder="Event Time"
                  value={event.time}
                  onChange={(e) =>
                    setEvent((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-2">
              <p>Registration:</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <LogIn className="size-5 text-orange-500" />
                </div>
                <select
                  onChange={(e) =>
                    setEvent((prev) => ({
                      ...prev,
                      registration: e.target.value,
                    }))
                  }
                  value={event.registration}
                  className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                  name="registration"
                  id="registration"
                >
                  <option value="open">open</option>
                  <option value="close">closed</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <p className="mt-4 mb-2">Event Description</p>
            <textarea
              onChange={(e) =>
                setEvent((prev) => ({ ...prev, description: e.target.value }))
              }
              value={event.description}
              className="w-full px-4 pt-2 border rounded"
              placeholder="About Event"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-10 py-3 rounded-3xl mt-4"
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              'Update Event'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
