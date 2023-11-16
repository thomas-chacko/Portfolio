import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import  {HiArrowNarrowRight} from "react-icons/hi"
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
        <button className='text-white group border-2 px-6 py-3 my-2 flex items-center'>
            View Work
            <span className='group-hover:rotate-90 duration-300'>
              <HiArrowNarrowRight className='ml-3 ' />
            </span>
          </button>
        </div>

        {/* social media */}
        <div className="w-full mt-10">
          <ul className="flex justify-center gap-5 text-gray-300">
            <li>
              <a href="https://www.linkedin.com/in/thomas-chacko-7003a9283/">
                <FaLinkedin
                  size={40}
                  className="hover:scale-150 duration-300 hover:text-white hover:border-b-2 "
                />
              </a>
            </li>
            <li className="">
              <a href="https://github.com/thomas-chacko/">
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
