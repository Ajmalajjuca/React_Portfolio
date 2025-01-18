import React, { useState } from 'react';
import { Edit, Save, X, Camera } from 'lucide-react';

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Full Stack Developer',
    position: 'Senior Software Engineer',
    bio: 'Passionate developer with 5+ years of experience',
    journey: 'Started coding at age 12, graduated from MIT in Computer Science, worked at several startups before joining current role.',
    aboutMe: {
      hobbies: 'Photography, hiking, and open source contribution',
      skills: 'React, Node.js, Python, Cloud Architecture',
      languages: 'English (Native), Spanish (Intermediate)',
      interests: 'AI/ML, Blockchain, IoT'
    },
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    avatar: '/api/placeholder/150/150',
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      portfolio: 'https://johndoe.com'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [errors, setErrors] = useState({});

  const validateProfile = (profileData) => {
    const newErrors = {};

    if (!profileData.name.trim()) newErrors.name = 'Name is required';
    if (!profileData.position.trim()) newErrors.position = 'Position is required';
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Invalid email format';
    }

    Object.entries(profileData.socialLinks).forEach(([key, value]) => {
      if (value && !value.startsWith('https://')) {
        newErrors[`socialLinks.${key}`] = 'URL must start with https://';
      }
    });

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateProfile(editedProfile);
    
    if (Object.keys(validationErrors).length === 0) {
      setProfile(editedProfile);
      setIsEditing(false);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setErrors({});
  };

  const renderViewMode = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-bold">{profile.name}</h3>
            <p className="text-gray-600">{profile.title}</p>
            <p className="text-gray-500">{profile.position}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Bio</h4>
          <p className="mt-1">{profile.bio}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">My Journey</h4>
          <p className="mt-1">{profile.journey}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">More About Me</h4>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Hobbies</p>
              <p className="text-gray-600">{profile.aboutMe.hobbies}</p>
            </div>
            <div>
              <p className="font-medium">Skills</p>
              <p className="text-gray-600">{profile.aboutMe.skills}</p>
            </div>
            <div>
              <p className="font-medium">Languages</p>
              <p className="text-gray-600">{profile.aboutMe.languages}</p>
            </div>
            <div>
              <p className="font-medium">Interests</p>
              <p className="text-gray-600">{profile.aboutMe.interests}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Email</h4>
            <p className="mt-1">{profile.email}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Phone</h4>
            <p className="mt-1">{profile.phone}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Location</h4>
            <p className="mt-1">{profile.location}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500">Social Links</h4>
          <div className="mt-1 space-y-2">
            {Object.entries(profile.socialLinks).map(([platform, link]) => (
              <div key={platform} className="flex items-center gap-2">
                <span className="capitalize">{platform}:</span>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEditMode = () => (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={editedProfile.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg border">
            <Camera className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={editedProfile.name}
            onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
            className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={editedProfile.title}
            onChange={(e) => setEditedProfile({...editedProfile, title: e.target.value})}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <input
            type="text"
            value={editedProfile.position}
            onChange={(e) => setEditedProfile({...editedProfile, position: e.target.value})}
            className={`w-full p-2 border rounded-md ${errors.position ? 'border-red-500' : ''}`}
          />
          {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          value={editedProfile.bio}
          onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
          className="w-full p-2 border rounded-md"
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">My Journey</label>
        <textarea
          value={editedProfile.journey}
          onChange={(e) => setEditedProfile({...editedProfile, journey: e.target.value})}
          className="w-full p-2 border rounded-md"
          rows="4"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">More About Me</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hobbies</label>
            <input
              type="text"
              value={editedProfile.aboutMe.hobbies}
              onChange={(e) => setEditedProfile({
                ...editedProfile,
                aboutMe: {...editedProfile.aboutMe, hobbies: e.target.value}
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <input
              type="text"
              value={editedProfile.aboutMe.skills}
              onChange={(e) => setEditedProfile({
                ...editedProfile,
                aboutMe: {...editedProfile.aboutMe, skills: e.target.value}
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
            <input
              type="text"
              value={editedProfile.aboutMe.languages}
              onChange={(e) => setEditedProfile({
                ...editedProfile,
                aboutMe: {...editedProfile.aboutMe, languages: e.target.value}
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
            <input
              type="text"
              value={editedProfile.aboutMe.interests}
              onChange={(e) => setEditedProfile({
                ...editedProfile,
                aboutMe: {...editedProfile.aboutMe, interests: e.target.value}
              })}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={editedProfile.email}
            onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
            className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={editedProfile.phone}
            onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={editedProfile.location}
            onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Social Links</h3>
        {Object.entries(editedProfile.socialLinks).map(([platform, link]) => (
          <div key={platform}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {platform} URL
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setEditedProfile({
                ...editedProfile,
                socialLinks: {...editedProfile.socialLinks, [platform]: e.target.value}
              })}
              className={`w-full p-2 border rounded-md ${errors[`socialLinks.${platform}`] ? 'border-red-500' : ''}`}
            />
            {errors[`socialLinks.${platform}`] && (
              <p className="mt-1 text-sm text-red-500">{errors[`socialLinks.${platform}`]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Save className="h-4 w-4" /> Save Changes
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Edit className="h-4 w-4" /> Edit Profile
          </button>
        )}
      </div>

      {isEditing ? renderEditMode() : renderViewMode()}
    </div>
  );
};

export default ProfileManagement;