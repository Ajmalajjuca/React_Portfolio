// ProfileManagement.jsx
import React, { useState, useEffect } from 'react';
import { Edit, Save, X, Camera, Loader } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchProfile } from '../../redux/Store/fetching';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSkeleton from './Skeletons/ProfileSkeleton';


const ProfileManagement = () => {
  const dispatch = useDispatch();


  const profiles = useSelector(state => state.profile.profile);
  const loading = useSelector(state => state.profile.isLoading);
  console.log('loading>>>>', loading);

  const error = useSelector(state => state.profile.error);

  useEffect(() => {
    fetchProfile(dispatch);
  }, []);






  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    journey: '',
    email: '',
    phone: '',
    avatar: '',
    aboutMe: {
      hobbies: '',
      skills: '',
      languages: '',
      interests: ''
    },
    socialLinks: {
      github: '',
      linkedin: '',
      instagram: ''
    },
    contributions: {
      leetcode: '',
      github: ''
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profiles || []);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);






  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedProfile({ ...editedProfile, avatar: e.target.result });
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSave = async () => {
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        const profileData = editedProfile[0];
  
        // Log the data being sent
        console.log('Profile Data being sent:', profileData);
  
        // Append all fields, including nested objects
        Object.entries(profileData || {}).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (typeof value === 'object' && !(value instanceof File)) {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value);
            }
          }
        });
  
        // Append avatar if selected
        if (selectedFile) {
          formData.append('avatar', selectedFile);
        }
  
        // Log FormData contents
        for (let pair of formData.entries()) {
          console.log('FormData entry:', pair[0], pair[1]);
        }
  
        const url = profileData?._id 
          ? `http://localhost:5000/profile/${profileData._id}`
          : 'http://localhost:5000/profile';
        
        const method = profileData?._id ? 'put' : 'post';
        
        const response = await axios[method](url, formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        });
  
        setProfile(response.data.profile);
        setIsEditing(false);
        setErrors({});
        toast.success('Profile updated successfully');
        
      } catch (error) {
        console.error('Error saving profile:', error);
        toast.error('Failed to update profile');
      } finally {
        setIsLoading(false);
        setIsEditing(false);
        fetchProfile(dispatch);
      }
    } else {
      setErrors(errors);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
    setErrors({});
    setSelectedFile(null);
  };

  if (isLoading && !isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Profile Management</h2>
        {!isEditing && (
          <button
            onClick={() => {
              setIsEditing(true);
              setEditedProfile(profiles);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Edit className="h-4 w-4" /> Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {isEditing ? (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <img
                src={`http://localhost:5000${profiles[0]?.avatar}` || '/default-avatar.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <label className="cursor-pointer bg-gray-50 px-4 py-2 rounded-md border hover:bg-gray-100">
                <Camera className="h-4 w-4 inline mr-2" />
                <span>Change Photo</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* Basic Information */}
            {console.log('editedProfile', editedProfile)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  value={editedProfile[0]?.name || ''}
                  onChange={(e) => setEditedProfile([{
                    ...editedProfile[0],
                    name: e.target.value
                  }])}
                  className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editedProfile[0]?.title || ''}
                  onChange={(e) => setEditedProfile([{
                    ...editedProfile[0],
                    title: e.target.value
                  }])}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  value={editedProfile[0]?.email || ''}
                  onChange={(e) => setEditedProfile([{ ...editedProfile[0], email: e.target.value }])}
                  className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={editedProfile[0]?.phone || ''}
                  onChange={(e) => setEditedProfile([{ ...editedProfile[0], phone: e.target.value }])}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            {/* Bio & Journey */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={editedProfile[0]?.bio || ''}
                onChange={(e) => setEditedProfile([{ ...editedProfile[0], bio: e.target.value }])}
                rows="3"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Professional Journey
              </label>
              <textarea
                value={editedProfile[0]?.journey || ''}
                onChange={(e) => setEditedProfile([{ ...editedProfile[0], journey: e.target.value }])}
                rows="4"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Social Media</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub
                  </label>
                  <input
                    type="text"
                    value={editedProfile[0]?.socialLinks?.github || ''}
                    onChange={(e) => setEditedProfile([{
                      ...editedProfile[0],
                      socialLinks: {
                        ...editedProfile[0]?.socialLinks,
                        github: e.target.value
                      }
                    }])}
                    className="w-full p-2 border rounded-md"
                    placeholder="GitHub username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={editedProfile[0]?.socialLinks?.linkedin || ''}
                    onChange={(e) => setEditedProfile([{
                      ...editedProfile[0],
                      socialLinks: {
                        ...editedProfile[0]?.socialLinks,
                        linkedin: e.target.value
                      }
                    }])}
                    className="w-full p-2 border rounded-md"
                    placeholder="LinkedIn profile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={editedProfile[0]?.socialLinks?.instagram || ''}
                    onChange={(e) => setEditedProfile([{
                      ...editedProfile[0],
                      socialLinks: {
                        ...editedProfile[0]?.socialLinks,
                        instagram: e.target.value
                      }
                    }])}
                    className="w-full p-2 border rounded-md"
                    placeholder="Instagram username"
                  />
                </div>
              </div>
            </div>

            {/* Contributions Section */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Contributions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LeetCode Username
                  </label>
                  <input
                    type="text"
                    value={editedProfile[0]?.contributions?.leetcode || ''}
                    onChange={(e) => setEditedProfile([{
                      ...editedProfile[0],
                      contributions: {
                        ...editedProfile[0]?.contributions,
                        leetcode: e.target.value
                      }
                    }])}
                    className="w-full p-2 border rounded-md"
                    placeholder="LeetCode username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={editedProfile[0]?.contributions?.github || ''}
                    onChange={(e) => setEditedProfile([{
                      ...editedProfile[0],
                      contributions: {
                        ...editedProfile[0]?.contributions,
                        github: e.target.value
                      }
                    }])}
                    className="w-full p-2 border rounded-md"
                    placeholder="GitHub username"
                  />
                </div>
              </div>
            </div>


            {/* Social Links */}


            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() =>{

                  handleSave()
                  setIsEditing(true);
                  setEditedProfile(Array.isArray(profiles) ? profiles : [profiles]);
                }
                }
              disabled={isLoading}
              className="bg-blue-500 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
              >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md flex items-center gap-2 hover:bg-gray-400"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
          </form>
      ) : (
      /* View Mode */
      <div className="space-y-6">

        {loading ?
          <ProfileSkeleton />
          :
          <>
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000${profiles[0]?.avatar}` || '/default-avatar.png'}
                  alt={profiles[0]?.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{profiles[0]?.name}</h3>
                  <p className="text-gray-600">{profiles[0]?.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="text-gray-600">Email: {profiles[0]?.email}</p>
                  <p className="text-gray-600">Phone: {profiles[0]?.phone}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-gray-600">{profiles[0]?.bio}</p>
                </div>
              </div>

              {profiles[0]?.journey && (
                <div>
                  <h4 className="font-medium mb-2">Professional Journey</h4>
                  <p className="text-gray-600">{profiles[0]?.journey}</p>
                </div>
              )}



            </div>
            {/* Existing Profile View Content */}
            {/* Social Media Section */}
            {(profiles[0]?.socialLinks?.github ||
              profiles[0]?.socialLinks?.linkedin ||
              profiles[0]?.socialLinks?.instagram) && (
                <div>
                  <h4 className="font-medium mb-2">Social Media</h4>
                  <div className="flex gap-4">
                    {profiles[0]?.socialLinks?.github && (
                      <a
                        href={`https://github.com/${profiles[0].socialLinks.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        GitHub
                      </a>
                    )}
                    {profiles[0]?.socialLinks?.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${profiles[0].socialLinks.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        LinkedIn
                      </a>
                    )}
                    {profiles[0]?.socialLinks?.instagram && (
                      <a
                        href={`https://instagram.com/${profiles[0].socialLinks.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              )}

            {/* Contributions Section */}
            {(profiles[0]?.contributions?.leetcode ||
              profiles[0]?.contributions?.github) && (
                <div>
                  <h4 className="font-medium mb-2">Contributions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {profiles[0]?.contributions?.leetcode && (
                      <p className="text-gray-600">
                        LeetCode: {profiles[0].contributions.leetcode}
                      </p>
                    )}
                    {profiles[0]?.contributions?.github && (
                      <p className="text-gray-600">
                        GitHub: {profiles[0].contributions.github}
                      </p>
                    )}
                  </div>
                </div>
              )}
          </>
        }

      </div>
        )}
    </div>
    </div >
  );
};

export default ProfileManagement;