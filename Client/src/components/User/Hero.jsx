import React, { useEffect } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import hero from "../../assets/a-realistic-cartoon-portrait-of-a-23-yea_ysAsbjWOSsSNA4hTWVix3g_ErxRV28sSyqTkSTdwUITAA-Photoroom.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile,fetchSkills } from "../../redux/Store/fetching";
/* bg-[#FEFEFE] */
const Hero = () => {
  const profile = useSelector(state => state.profile);
  const skills = useSelector(state => state.skill);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProfile(dispatch);
    fetchSkills(dispatch);
  }, []);
  return (
    <section className="relative ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row items-center lg:h-[90vh] justify-between ">
        <div className="md:w-1/2 space-y-6 lg:space-y-8 px-6 lg:px-0 pt-20 md:pt-0">
        <h1 className="lg:text-6xl text-3xl font-bold lg:leading-tight font-serif text-gray-800">
              Hi There, <br />
              I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">{profile.profile[0]?.name}</span>
            </h1>

            <p className="md:text-xl text-lg mb-6 text-gray-700 font-medium font-sans">
              Web Developer & Designer
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-600 font-light">
              I'm a passionate web developer with expertise in{" "}
              <span className="text-black-500 font-semibold">React</span>,
              <span className="text-black-500 font-semibold"> Next.js</span>,
              and modern web technologies. I love creating beautiful and
              functional websites that solve real-world problems.
            </p>

            <button className="group bg-gray-900 hover:bg-indigo-600 transition-all duration-300 text-white px-6 py-3 rounded-full flex items-center gap-2">
              <span>Download CV</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <div className="md:w-1/2 relative flex justify-center items-center mt-10 md:mt-0">
            <div className="relative">
              <img src={hero} alt="Profile" className="lg:h-[80vh] h-96 object-cover" />
              
              <img
                src={`http://localhost:5000${skills.skills[0]?.logo}`}
                alt="React"
                className="absolute w-14 top-1/4 -left-7 rounded-full animate-bounce-slow"
              />
              <img
                src={`http://localhost:5000${skills.skills[1]?.logo}`}
                alt="Next.js"
                className="absolute w-14 top-10 right-0 animate-float"
              />
              <img
                src={`http://localhost:5000${skills.skills[2]?.logo}`}
                alt="Tailwind"
                className="absolute w-14 rounded-full right-0 bottom-1/4 animate-pulse"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-52 right-10 hidden bg-[#FEFEFE] p-4 md:flex flex-col gap-8 rounded-full">
        <a href="https://github.com/joeltdev" target="blank">
          {" "}
          <FaGithub className="w-10 h-10 text-gray-900" />
        </a>
        <a href="https://www.instagram.com/" target="blank">
          {" "}
          <FaInstagram className="w-10 h-10 text-gray-900" />
        </a>
        <a href="https://x.com/" target="blank">
          <FaXTwitter className="w-10 h-10 text-gray-900" />
        </a>{" "}
        <a
          href="https://www.linkedin.com/in/joel-thomas-mathew-18422b1b8/"
          target="blank"
        >
          {" "}
          <FaLinkedin className="w-10 h-10 text-gray-900" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
