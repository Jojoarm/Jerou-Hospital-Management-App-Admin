import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Doctors = () => {
  const { doctors } = useContext(AdminContext);
  return (
    <div className="flex flex-col items-center gap-3 text-gray-900 md:mx-10">
      <h2 className="text-2xl font-bold">All Doctors</h2>
      <div className="flex flex-wrap justify-center items-start gap-5">
        {doctors.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            key={index}
            className="border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:scale-125 transition-all duration-500"
          >
            <div className="w-64 h-60 bg-slate-200">
              <img
                src={item.image}
                alt="profile image"
                className=" h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
              <div className="flex items-center gap-2 text-sm text-center">
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.available ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                ></p>
                <p
                  className={`${
                    item.available ? 'text-green-500' : 'text-gray-500'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
