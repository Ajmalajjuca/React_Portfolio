import React from "react";
import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {fetchProfile, fetchSkills} from '../../redux/Store/fetching';

const   About = () => {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProfile(dispatch);
    
  }, []);
  
  useEffect(() => {
    fetchSkills(dispatch);
  }, []);
  
  const skill = useSelector(state => state.skill);
  
  return (
    <div className="relative" id="about">
      <div className="bg-gradient-to-b from-gray-50 to-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-indigo-600 text-lg font-medium tracking-wide uppercase">
              About Me
            </h2>
            <p className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
              {console.log('profile>>>>',profile.profile[0]?.name)}
              Hi, I'm {profile.profile[0]?.name}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto leading-relaxed">
              {profile.profile[0]?.title}
            </p>
          </div>
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  My Journey
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {profile.profile[0]?.journey}
                </p>
                <img src="" alt="" className="p-2 rounded-lg w-52 mt-4" />
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                  Skills & Expertise
                </h3>
                <div className="flex items-center justify-center flex-wrap gap-4">
                  {skill.skills.map((skill,index) => (
                    <div key={index} className="bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-xl hover:shadow-md transition-all duration-300">
                      <img src={`http://localhost:5000${skill.logo}`} alt={skill.name} className="w-8" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-900">
              More About Me
            </h3>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {profile.profile[0]?.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
