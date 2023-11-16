import aboutImg from "../assets/thomaschacko.jpg";
const About = () => {
  return (
    <div name="about" className="max-w-[1000px] mx-auto p-4 text-gray-300 pt-5">
      <div className="w-[140px] mb-5">
        <h1 className="text-3xl text-center  font-bold border-b-4 border-pink-600">About Me</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center">
        <img data-aos="fade-right" src={aboutImg} alt="" className="w-[90%] md:w-[300px]" />
        <div className="hidden md:flex w-1 h-72 rounded-full border-r-4"></div>
        <div data-aos="flip-up" className="flex flex-col pt-5 pl-5">
          <h1 className="text-2xl">Name : Thomas Chacko</h1>
          <h1 className="text-2xl">Age : 21</h1>
          <h1 className="text-2xl">Education : BCA</h1>
          <h1 className="text-2xl">Phone : 8330811956</h1>
          <h1 className="text-2xl">Email : thomaschacko180@gmail.com</h1>
        </div>
      </div>
    </div>
  );
};

export default About;
