import React from "react";
import MernStack from "../../assets/mernstack.png";
import Html from "../../assets/Html.png";
import Css from "../../assets/CSS.png";
import Javascript from "../../assets/JS.png";
import ReactLogo from "../../assets/React.png";
import Tailwind from "../../assets/Tailwind Css.png";
import MongoDb from "../../assets/mongodb.svg";
import NodeLogo from "../../assets/NodeLogo.png";
import Golang from "../../assets/Go-Logo_Blue (1).svg";
import Express from "../../assets/Express.png";
import NextJs from "../../assets/NextJs.png";

const   About = () => {
  return (
    <div className="relative" id="about">
      <div className="bg-gradient-to-b from-gray-50 to-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-indigo-600 text-lg font-medium tracking-wide uppercase">
              About Me
            </h2>
            <p className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
              Hi, I'm Ajmal C A
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto leading-relaxed">
              A Full-Stack Developer with expertise in web development
            </p>
          </div>
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  My Journey
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  I began my web development journey with a passion for building
                  intuitive and scalable applications. Proficient in the MERN
                  stack (MongoDB, Express.js, React, Node.js), I have
                  developed projects including a full-stack E-commerce 
                  website, CURD Application, Olx Clone and a Netflix clone. These projects
                  showcase my ability to combine robust backend solutions with
                  sleek, user-friendly frontend designs.
                </p>
                <img src="" alt="" className="p-2 rounded-lg w-52 mt-4" />
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                  Skills & Expertise
                </h3>
                <div className="flex items-center justify-center flex-wrap gap-4">
                  <div className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                    <img src={Html} alt="HTML" className="w-8" />
                    <span className="font-medium">HTML</span>
                  </div>
                  <div className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                    <img src={Css} alt="CSS" className="w-8" />
                    <span className="font-medium">CSS</span>
                  </div>
                  <div className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                    <img src={Javascript} alt="Javascript" className="w-8" />
                    <span className="font-medium">Javascript</span>
                  </div>
                  <div className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                    <img src={ReactLogo} alt="React" className="w-8 rounded-full" />
                    <span className="font-medium">React</span>
                  </div>
                  <div className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                    <img src={Tailwind} alt="Tailwind Css" className="w-8 rounded-full" />
                    <span className="font-medium">Tailwind Css</span>
                  </div>
                  <div className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                    <img src={MongoDb} alt="Mongodb" className="w-8" />
                    <span className="font-medium">Mongodb</span>
                  </div>
                  <div className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                    <img src={NodeLogo} alt="Node Js" className="w-8" />
                    <span className="font-medium">Node Js</span>
                  </div>
                  
                  <div className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                    <img src={Express} alt="Express Js" className="w-8" />
                    <span className="font-medium">Express Js</span>
                  </div>
                  <div className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                    <img src={NextJs} alt="Next Js" className="w-8" />
                    <span className="font-medium">Next Js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-900">
              More About Me
            </h3>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              In addition to coding, I’m deeply passionate about learning new
              technologies and staying up-to-date with the latest trends in web
              development. I also run a YouTube channel where I share my
              knowledge on topics like JavaScript, MERN Stack development,
              and digital marketing. Through my channel, I help
              others explore and dive deep into the world of programming and
              technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
