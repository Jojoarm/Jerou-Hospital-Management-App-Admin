import { useContext } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
import { CircleX, Pencil } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Posts = () => {
  const { posts, backendUrl, dToken, getPosts } = useContext(DoctorContext);
  const navigate = useNavigate();

  const deletePost = async (eventId) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/doctor/delete-post/${eventId}`,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        await getPosts();
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
      <h2 className="text-xl md:text-2xl text-center font-semibold">
        Health Posts
      </h2>
      <div className="flex flex-col gap-1 justify-start">
        {posts.map((post, index) => (
          <div
            className="flex w-full justify-start items-start md:items-center p-2 hover:bg-slate-100 rounded-2xl"
            key={index}
          >
            <div
              className="grid grid-cols-[1.5fr_3fr] items-center gap-2 cursor-pointer "
              onClick={() => {
                navigate(`/post/${post._id}`);
                scrollTo(0, 0);
              }}
              key={index}
            >
              <img
                src={post.image}
                alt="display picture"
                className="w-[80%] rounded shadow-2xl"
              />
              <p className="md:font-medium font-normal text-blue-900 text-lg border-b border-dotted">
                {post.title}
              </p>
            </div>
            <div className="hidden md:flex gap-2 text-xs">
              <p
                className="text-green-500 cursor-pointer hover:text-white hover:bg-green-500 border border-green-500 rounded-xl py-1 px-4 shadow"
                onClick={() => {
                  navigate(`/doctor-update-post/${post._id}`);
                  scrollTo(0, 0);
                }}
              >
                Edit
              </p>
              <p
                className="text-red-500 cursor-pointer hover:text-white hover:bg-red-500 border border-red-500 rounded-xl py-1 px-2 shadow"
                onClick={() => deletePost(post._id)}
              >
                Delete
              </p>
            </div>
            <div className="flex md:hidden gap-2 text-sm">
              <Pencil
                className="text-gray-500 cursor-pointer size-4"
                onClick={() => {
                  navigate(`/doctor-update-post/${post._id}`);
                  scrollTo(0, 0);
                }}
              />
              <CircleX
                className="text-red-500 cursor-pointer size-4"
                onClick={() => deletePost(post._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
