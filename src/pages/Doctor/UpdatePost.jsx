import { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Captions, Loader } from 'lucide-react';
import { assets } from '../../assets/assets';

const UpdatePost = () => {
  const { backendUrl, dToken, getPosts } = useContext(DoctorContext);
  const [image, setImage] = useState(false);
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/post/${postId}`
      );
      if (data.success) {
        setIsLoading(false);
        setPost(data.post);
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
    getPost();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      image && formData.append('image', image);

      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/edit-post/${postId}`,
        formData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        await getPosts();
        setIsLoading(false);
        setImage(false);
        navigate('/doctor-dashboard');
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
      <form className="p-5 text-neutral-700 w-full" onSubmit={handleUpdatePost}>
        <div className=" w-full p-5 max-w-4xl bg-white border-x-2 border-slate-300 rounded-xl shadow ">
          <h2 className="text-center font-semibold text-xl">Update Post</h2>
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  className="w-36 rounded opacity-75"
                  src={image ? URL.createObjectURL(image) : post.image}
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
              <p>Post Title:</p>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Captions className="size-5 text-orange-500" />
                </div>
                <input
                  type="text"
                  placeholder="Post Title"
                  value={post.title}
                  onChange={(e) =>
                    setPost((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="mt-4 mb-2">Post Content</p>
            <textarea
              onChange={(e) =>
                setPost((prev) => ({ ...prev, content: e.target.value }))
              }
              value={post.content}
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
              'Update Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
