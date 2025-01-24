import React from "react";
import Portfolio from "../../assets/Screenshot 2024-12-15 at 1.34.14 PM.jpeg";
import Supercartwo from "../../assets/Portfolio.png";
import SpicyBites from "../../assets/SpicyBites.png";
import Youtube from "../../assets/Screenshot 2024-12-14 at 7.56.15 PM.jpeg";
import Gemini from "../../assets/Gemini.jpeg";
import Supercar from "../../assets/Supercar.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../../redux/Store/fetching.js";
import { useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project);
  useEffect(() => {
    fetchProjects(dispatch);
  }, []);
  console.log('projects>>>>',projects.projects);
  
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
      {projects.projects.map((item) => (
        <div
          key={item.id}
          className="group bg-gray-800 rounded-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl"
        >
          {/* Image Section */}
          <div className="relative overflow-hidden h-48">
            <img
              src={`http://localhost:5000${item.image}`}
              alt={item.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
              <a
                href={item.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="pt-4 border-t border-gray-700">
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-indigo-900 bg-opacity-50 text-indigo-300 px-2 py-1 rounded-md text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </section>
  );
};

export default Projects;
