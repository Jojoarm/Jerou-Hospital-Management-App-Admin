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
import { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const { isLoading, setIsLoading, backendUrl, aToken, getEvents } =
    useContext(AdminContext);
  const [eventImg, setEventImg] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventRegistration, setEventRegistration] = useState('open');
  const [eventFee, setEventFee] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!eventImg) {
        return toast.error('No Image Selected');
      }
      const formData = new FormData();
      formData.append('image', eventImg);
      formData.append('title', eventTitle);
      formData.append('description', eventDescription);
      formData.append('date', eventDate);
      formData.append('time', eventTime);
      formData.append('registration', eventRegistration);
      formData.append('fee', eventFee);

      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-event`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        setIsLoading(false);
        toast.success(data.message);
        setEventImg(false);
        setEventTitle('');
        setEventDescription('');
        setEventDate('');
        setEventTime('');
        setEventFee('');
        setEventRegistration('open');
        await getEvents();
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
      <form className="p-5 text-neutral-700 w-full" onSubmit={handleSubmit}>
        <div className=" w-full p-5 max-w-4xl bg-white border-x-2 border-slate-300 rounded-xl shadow ">
          <h2 className="text-center font-semibold text-xl">
            Add Upcoming Event
          </h2>
          <div className="flex items-center cursor-pointer gap-4 mb-8 text-gray-500">
            <label htmlFor="eventImg">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={
                  eventImg ? URL.createObjectURL(eventImg) : assets.upload_area
                }
                alt="upload icon"
              />
            </label>
            <input
              onChange={(e) => setEventImg(e.target.files[0])}
              type="file"
              id="eventImg"
              hidden
            />
            <p>
              Upload <br />
              Image for Event
            </p>
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
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
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
                  value={eventFee}
                  onChange={(e) => setEventFee(e.target.value)}
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
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
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
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
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
                  onChange={(e) => setEventRegistration(e.target.value)}
                  value={eventRegistration}
                  className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                  name="registration"
                  id="registration"
                >
                  <option value="1 Year">open</option>
                  <option value="1 Year">closed</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <p className="mt-4 mb-2">Event Description</p>
            <textarea
              onChange={(e) => setEventDescription(e.target.value)}
              value={eventDescription}
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
              'Add Event'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
