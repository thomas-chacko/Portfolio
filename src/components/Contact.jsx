
const Contact = () => {
  return (
    <div data-aos="zoom-in" name="contact" className="w-full flex justify-center items-center p-5">
      <form className="flex flex-col max-w-[600px] w-full">
        <div className="pb-8 flex w-full justify-center">
          <p className="text-4xl font-bold inline border-b-4 border-pink-600 text-gray-300">
            Contact Me
          </p>
        </div>
        <input
          className="bg-[#ccd6f6] p-2 outline-none placeholder:text-black"
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className="my-4 p-2 bg-[#ccd6f6] outline-none placeholder:text-black"
          type="email"
          placeholder="Email"
          name="email"
        />
        <textarea
          className="bg-[#ccd6f6] p-2 outline-none placeholder:text-black"
          name="message"
          rows="10"
          placeholder="Message"
        ></textarea>
        <button className="text-white border-2 w-48 mx-auto py-3 my-8">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
