import React from 'react';

const SkillsSkeleton = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
      </div>

      {/* Skills Grid */}
      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3 flex-1">
                {/* Skill Logo */}
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                
                <div className="flex-1">
                  {/* Skill Name and Category */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
                  </div>

                  {/* Progress Bar Background */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    {/* Animated Progress Bar */}
                    <div 
                      className="bg-gray-300 h-2.5 rounded-full animate-pulse"
                      style={{ width: '60%' }}
                    />
                  </div>

                  {/* Proficiency Text */}
                  <div className="mt-1">
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 ml-4">
                <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSkeleton;