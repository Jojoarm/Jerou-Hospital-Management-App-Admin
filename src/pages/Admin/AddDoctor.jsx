import {
  BadgeDollarSign,
  BriefcaseBusiness,
  Gem,
  GraduationCap,
  Loader,
  Lock,
  Mail,
  MapPinHouse,
  User,
} from 'lucide-react';
import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fee, setFee] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General-Physician');
  const [qualification, setQualification] = useState('MBBS');
  const [address, setAddress] = useState('');

  const { backendUrl, aToken, isLoading, setIsLoading } =
    useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error('Image not selected');
      }
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      formData.append('image', docImg);
      formData.append('experience', experience);
      formData.append('fee', fee);
      formData.append('speciality', speciality);
      formData.append('qualification', qualification);
      formData.append('address', address);
      formData.append('about', about);

      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        setIsLoading(false);
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setAbout('');
        setAddress('');
        setFee('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       await addDoctor(
  //         docImg,
  //         name,
  //         email,
  //         password,
  //         experience,
  //         fee,
  //         about,
  //         speciality,
  //         qualification,
  //         address
  //       );
  //     } catch (error) {
  //       console.log(error);
  //       toast.error(error.message);
  //     }
  //   };

  return (
    <form className="mt-5 p-5 text-neutral-700 w-full" onSubmit={handleSubmit}>
      <div className=" w-full p-5 max-w-4xl bg-white border-x-2 border-slate-300 rounded-xl shadow ">
        <h2 className="text-center font-semibold text-xl">Add Doctor</h2>
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="upload icon"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload <br />
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-2">
            <p>Password:</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="size-5 text-orange-500" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
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
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
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
            <p>Speciality:</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Gem className="size-5 text-orange-500" />
              </div>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                name=""
                id=""
              >
                <option value="General-Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
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
            'Add Doctor'
          )}
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
