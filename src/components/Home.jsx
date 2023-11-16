import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
const Home = () => {
  return (
    <div name="home" className="w-full h-screen border-b-0 border-black">
      {/* Container */}
      <div className="max-w-[1000px] mx-auto px-6 py-28 flex flex-col justify-center ">
        <p className="text-pink-600 text-2xl">Hi, my name is</p>
        <h1 className="text-5xl sm:text-7xl font-bold text-[#ccd6f6] py-3">
          Thomas Chacko
        </h1>
        <h2 className="text-4xl sm:text-7xl font-bold text-[#8892b0]">
          I'm a Full Stack Developer.
        </h2>
        <p className="text-[#8892b0] py-4 max-w-[700px] ">
          I’m a full-stack developer specializing in building exceptional
          digital experiences. Currently, I’m focused on building responsive
          full-stack web applications.
        </p>
        <div>
          <button className="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer  z-10 group">
            Read More
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-pink-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-pink-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
              Thanks
            </span>
          </button>
        </div>

        {/* social media */}
        <div className="w-full mt-10">
          <ul className="flex justify-center gap-5 text-gray-300">
            <li>
              <a href="/">
                <FaLinkedin
                  size={40}
                  className="hover:scale-150 duration-300 hover:text-white hover:border-b-2 "
                />
              </a>
            </li>
            <li className="">
              <a href="/">
                <FaGithub
                  size={40}
                  className="hover:scale-150 duration-300 hover:text-white hover:border-b-2"
                />
              </a>
            </li>
            <li className="">
              <a href="/">
                <HiOutlineMail
                  size={40}
                  className="hover:scale-150 duration-300 hover:text-white hover:border-b-2"
                />
              </a>
            </li>
            <li className="">
              <a href="/">
                <BsFillPersonLinesFill
                  size={40}
                  className="hover:scale-150 duration-300 hover:text-white hover:border-b-2"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
