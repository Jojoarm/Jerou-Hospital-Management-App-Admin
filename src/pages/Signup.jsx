import { motion } from 'framer-motion';
import Input from '../components/Input';
import { FileLock2, Loader, Lock, MailMinus, Users } from 'lucide-react';
import { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const { isLoading, adminSignup } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminSignup(name, email, password, adminKey);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-[150px] flex flex-col items-center justify-center h-full border-b-2 border-t-2 text-center border-orange-500 rounded-xl gap-3 m-auto min-h-[60vh] max-w-md w-full text-sm shadow-lg"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 text-center bg-clip-text">
          <span className="text-orange-500">Admin</span> Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Users}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            icon={FileLock2}
            type="password"
            placeholder="Admin Key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
          />

          <motion.button className="bg-orange-500 text-white w-full py-2 rounded-md text-base">
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              'Sign Up'
            )}
          </motion.button>
          <p className="mt-2">
            Already have an account?{' '}
            <span
              className="underline cursor-pointer text-orange-500"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
