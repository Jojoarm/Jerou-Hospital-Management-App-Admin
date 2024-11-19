import { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  CircleX,
  Gem,
  GraduationCap,
  Loader,
  Mail,
  MapPinHouse,
  User,
  UserX,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import axios from 'axios';

const DoctorProfile = () => {
  const {
    // doctor,
    // getDoctor,
    // setDoctor,

    backendUrl,
    dToken,
  } = useContext(DoctorContext);
  const [doctor, setDoctor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const getDoctor = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/doctor-profile`,
        {
          headers: { dToken },
        }
      );
      if (data.success) {
        setIsLoading(false);
        setDoctor(data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getDoctor();
    }
  }, [dToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', doctor.name);
      formData.append('qualification', doctor.qualification);
      formData.append('experience', doctor.experience);
      formData.append('speciality', doctor.speciality);
      formData.append('available', doctor.available);
      formData.append('fee', doctor.fee);
      formData.append('address', doctor.address);
      formData.append('about', doctor.about);
      image && formData.append('image', image);

      //   setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        formData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        // setIsLoading(false);
        setIsEditing(false);
        setImage(false);
        await getDoctor();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      //   setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="w-full mb-10">
      {!isEditing ? (
        <div className="mt-5 mx-5 flex flex-col gap-5">
          <img
            src={doctor.image}
            alt="profile pic"
            className=" w-64 rounded-2xl"
          />
          <div className="flex flex-col gap-2 bg-white border rounded p-5 text-slate-600 shadow w-full md:w-[90%]">
            <h2 className="text-2xl md:text-3xl font-semibold">
              {doctor.name}
            </h2>
            <div className="flex gap-2 items-center">
              <p className="font-medium text-base md:text-lg">
                {doctor.qualification} - {doctor.speciality}
              </p>
              <p className=" px-3 py-1 bg-gray-400 text-white border rounded-xl text-xs font-medium">
                {doctor.experience}
              </p>
            </div>
            <div className="border-r border-l shadow rounded-xl p-2 md:p-4 md:w-[70%]">
              <p className="font-semibold">About:</p>
              <p className="text-xs md:text-sm ">{doctor.about}</p>
            </div>
            <div className="flex items-center gap-4 ">
              <p className="font-semibold">Appointment Fee:</p>
              <p className="text-xs md:text-sm ">&#8358; {doctor.fee}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold">Address:</p>
              <p className="text-xs md:text-sm ">{doctor.address}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold">Status:</p>
              <p>{doctor.available ? 'Available' : 'Unavailable'}</p>
            </div>
            <button
              className="px-4 py-2 w-[200px] bg-slate-700 cursor-pointer text-white border rounded"
              onClick={() => {
                setIsEditing(true);
                scrollTo(0, 0);
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form
          className="mt-5 p-5 text-neutral-700 w-full"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full p-5 max-w-4xl bg-white border-x-2 border-slate-300 rounded-xl shadow ">
            <CircleX
              className="absolute right-0 top-0 m-2 cursor-pointer size-4 md:size-5 text-red-500"
              onClick={() => setIsEditing(false)}
            />
            <h2 className="text-center font-semibold text-xl">
              Update Profile
            </h2>
            <div className="flex items-center gap-4 mb-8 text-gray-500">
              <label htmlFor="doc-img">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-36 rounded opacity-75"
                    src={image ? URL.createObjectURL(image) : doctor.image}
                    alt=""
                  />
                  <img
                    className="w-10 absolute bottom-12 right-12"
                    src={image ? '' : assets.upload_icon}
                    alt=""
                  />
                </div>
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="doc-img"
                hidden
              />
              <p>
                Update <br />
                Image
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 items-start ">
              <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p>Name:</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="size-5 text-orange-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={doctor.name}
                    onChange={(e) =>
                      setDoctor((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                  />
                </div>
              </div>
              <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p>Email:</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="size-5 text-orange-500" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={doctor.email}
                    disabled
                    className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                  />
                </div>
              </div>

              <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p>Qualification:</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <GraduationCap className="size-5 text-orange-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Qualification"
                    value={doctor.qualification}
                    onChange={(e) =>
                      setDoctor((prev) => ({
                        ...prev,
                        qualification: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                  />
                </div>
              </div>
              <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p>Experience:</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BriefcaseBusiness className="size-5 text-orange-500" />
                  </div>
                  <select
                    onChange={(e) =>
                      setDoctor((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                    value={doctor.experience}
                    className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                    name=""
                    id=""
                  >
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3 Years">3 Years</option>
                    <option value="4 Years">4 Years</option>
                    <option value="5 Years">5 Years</option>
                    <option value="6 Years">6 Years</option>
                    <option value="7 Years">7 Years</option>
                    <option value="8 Years">8 Years</option>
                    <option value="9 Years">9 Years</option>
                    <option value="10 Years">10 Years</option>
                    <option value="10 Years">10+ Years</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p>Available:</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UserX className="size-5 text-orange-500" />
                  </div>
                  <select
                    onChange={(e) =>
                      setDoctor((prev) => ({
                        ...prev,
                        available: e.target.value,
                      }))
                    }
                    value={doctor.available}
                    className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                    name=""
                    id=""
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p>Speciality:</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Gem className="size-5 text-orange-500" />
                  </div>
                  <select
                    onChange={(e) =>
                      setDoctor((prev) => ({
                        ...prev,
                        speciality: e.target.value,
                      }))
                    }
                    value={doctor.speciality}
                    className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                    name=""
                    id=""
                  >
                    <option value="General-Physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p>Address:</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPinHouse className="size-5 text-orange-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    value={doctor.address}
                    onChange={(e) =>
                      setDoctor((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                  />
                </div>
              </div>
              <div className="w-full lg:flex-1 flex flex-col gap-2">
                <p>Appointment Fee:</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <BadgeDollarSign className="size-5 text-orange-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Fee"
                    value={doctor.fee}
                    onChange={(e) =>
                      setDoctor((prev) => ({ ...prev, fee: e.target.value }))
                    }
                    className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="mt-4 mb-2">About Doctor</p>
              <textarea
                onChange={(e) =>
                  setDoctor((prev) => ({ ...prev, about: e.target.value }))
                }
                value={doctor.about}
                className="w-full px-4 pt-2 border rounded"
                placeholder="About Doctor"
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
                'Update Doctor'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DoctorProfile;
