import React from "react";
import Portfolio from "../../assets/Screenshot 2024-12-15 at 1.34.14 PM.jpeg";
import Supercartwo from "../../assets/Portfolio.png";
import SpicyBites from "../../assets/SpicyBites.png";
import Youtube from "../../assets/Screenshot 2024-12-14 at 7.56.15 PM.jpeg";
import Gemini from "../../assets/Gemini.jpeg";
import Supercar from "../../assets/Supercar.png";

const Projects = () => {
  const projectJson = [
    {
      id: 1,
      title: "Portfolio",
      desc: "Webelite Builders did an amazing job on our website. Their professionalism and dedication to our project were outstanding.",
      image: Portfolio,
      live: "https://react-portfolio-git-main-joels-projects-a1cb82de.vercel.app/",
      github: "https://github.com/joeltdev/react-portfolio",
    },
    {
      id: 2,
      title: "Spicy Bites",
      desc: "The team at Webelite Builders exceeded our expectations with their digital marketing expertise. Highly recommend!",
      image: SpicyBites,
      live: "https://spicybites.netlify.app/",
      github: "https://github.com/rohitsingh93300/YtSpicyBites",
    },
    {
      id: 3,
      title: "Netflix Clone",
      desc: "Working with Webelite Builders was a seamless experience. They brought our vision to life with a modern, responsive website.",
      image: Youtube,
      live: "https://netflix-clone-jtm.vercel.app",
      github: "https://github.com/joeltdev/netflix-clone",
    },
    {
      id: 4,
      title: "Gemini AI Clone",
      desc: "Google Gemini AI is a cutting-edge multimodal model that integrates text and images for versatile, next-generation AI solutions.",
      image: Gemini,
      live: "https://gemini-clone-jtm.vercel.app/",
      github: "https://github.com/joeltdev/gemini-clone",
    },
    {
      id: 5,
      title: "Google gemini",
      desc: "Working with Webelite Builders was a seamless experience. They brought our vision to life with a modern, responsive website.",
      image: Supercar,
      live: "https://supercar123.netlify.app/",
      github: "https://github.com/rohitsingh93300/supercars",
    },
    {
      id: 6,
      title: "Super Car",
      desc: "Working with Webelite Builders was a seamless experience. They brought our vision to life with a modern, responsive website.",
      image: Supercartwo,
      live: "https://supercar123.netlify.app/",
      github: "https://github.com/rohitsingh93300/supercars",
    },
  ];

  return (
    <section id="projects" className="relative bg-gradient-to-b from-gray-800 to-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectJson.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-800 rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Live Demo
                  </a>
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
