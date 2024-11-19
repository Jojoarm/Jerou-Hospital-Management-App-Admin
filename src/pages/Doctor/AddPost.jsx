import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Captions, Loader } from 'lucide-react';
import { DoctorContext } from '../../context/DoctorContext';
// import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { isLoading, setIsLoading, backendUrl, dToken, getPosts } =
    useContext(DoctorContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        return toast.error('No Image Selected');
      }
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('content', content);

      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/add-post`,
        formData,
        { headers: { dToken } }
      );

      if (data.success) {
        setIsLoading(false);
        toast.success(data.message);
        setImage(false);
        setTitle('');
        setContent('');
        await getPosts();
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
      <form className="p-5 text-neutral-700 w-full" onSubmit={handleSubmit}>
        <div className=" w-full p-5 max-w-4xl bg-white border-x-2 border-slate-300 rounded-xl shadow ">
          <h2 className="text-center font-semibold text-xl">Add Health Post</h2>
          <div className="flex items-center cursor-pointer gap-4 mb-8 text-gray-500">
            <label htmlFor="post-img">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="upload icon"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="post-img"
              hidden
            />
            <p>
              Upload <br />
              Image for Post
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
                  placeholder="Post Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-orange-500focus:border-orange-500 focus:ring-2 focus:orange-500 text-black placeholder-slate-800 transition duration-200"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="mt-4 mb-2">Post Content</p>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full px-4 pt-2 border rounded"
              placeholder="Post Content"
              rows={10}
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
              'Add Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
