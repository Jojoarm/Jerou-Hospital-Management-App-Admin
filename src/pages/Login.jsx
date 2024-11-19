import { motion } from 'framer-motion';
import Input from '../components/Input';
import { FileLock2, Loader, Lock, MailMinus } from 'lucide-react';
import { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const { isLoading, adminLogin } = useContext(AdminContext);
  const { doctorLogin } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Admin') {
        await adminLogin(email, password, adminKey);
      } else {
        await doctorLogin(email, password);
      }
      // await adminLogin(email, password, adminKey);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mt-[150px] flex flex-col items-center justify-center h-full border-b-2 border-t-2 text-center border-orange-500 rounded-xl gap-3 m-auto min-h-[60vh] max-w-md w-full text-sm shadow-lg"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 text-center bg-clip-text">
          <span className="text-orange-500">{state}</span> Login
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={MailMinus}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {state === 'Admin' && (
            <Input
              icon={FileLock2}
              type="password"
              placeholder="Admin Key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
            />
          )}

          <motion.button className="bg-orange-500 text-white w-full py-2 rounded-md text-base">
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              'Login'
            )}
          </motion.button>
          {state === 'Admin' && (
            <p className="mt-2">
              Dont have an account?{' '}
              <span
                className="underline cursor-pointer text-orange-500"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </span>
            </p>
          )}
          {state === 'Admin' ? (
            <p className="absolute top-0 right-0  mx-2 p-2 border-b rounded">
              Doctor Login?{' '}
              <span
                className="text-orange-500 underline cursor-pointer"
                onClick={() => setState('Doctor')}
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="absolute top-0 right-0  mx-2 p-2 border-b rounded">
              Admin Login?{' '}
              <span
                className="text-orange-500 underline cursor-pointer"
                onClick={() => setState('Admin')}
              >
                Click here
              </span>
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
