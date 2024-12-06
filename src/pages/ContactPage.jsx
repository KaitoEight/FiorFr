import Lottie from 'lottie-react';
import  { useRef, useState } from 'react';
import mail from "../animations/mail.json"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);
const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, for example using Axios to send data to your API
    console.log({ email, query });
    // Reset form after submission
    setEmail('');
    setQuery('');
  };
  const img1 = useRef(null)
    const img2 = useRef(null)
    useGSAP(() => {
        gsap.from(img1.current, {
            opacity: 0,
            x: -20,
            duration: 0.1,
            scrollTrigger: {
                trigger: img1.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        })
        gsap.from(img2.current, {
            opacity: 0,
            x: 20,
            duration: 0.1,
            scrollTrigger: {
                trigger: img2.current,
                start: "top 80%",
            },
        })
    })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
    <section className="relative w-full py-20 px-3 mt-24 bg-pink-500 flex items-center justify-center flex-col -z-[1]">
        <h1 className="text-3xl font-extrabold text-white">About FiorDiSaigon</h1>
        <p  className="text-xl font-semibold text-white max-w-[800px] text-center mt-4">Fior Di Saigon is a italian shop which provides italian icecream called gelato with best quality</p>
        <img src="/flipgelatocup.png" alt="" className="md:w-[300px] max-md:w-[300px] absolute md:bottom-10 -left-10 max-md:bottom-2" ref={img1}/>
        <img src="/gelato3d.png" alt="" className="md:w-[270px] max-md:w-[160px] absolute -z-[2] bottom-10 md:right-10 max-md:right-2 max-md:bottom-32" ref={img2}/>
    </section>
    <div className='flex items-center justify-center gap-32 flex-wrap'>

    <div className="w-[30%] max-md:w-full mb-6 md:mb-0">
        <Lottie animationData={mail} loop={true} />
        </div>
      <div className=" hover:shadow-2xl shadow-lg border rounded-lg p-8 mx-7 mt-10 max-w-md w-full transition-all duration-300 ">
        <h1 className="text-2xl text-pink-500 font-bold mb-6 text-center">Contact</h1>
        <form onSubmit={handleSubmit} className=''>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              requiorange
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="query">
              Your Query
            </label>
            <textarea
              id="query"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
              rows="4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              requiorange
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
