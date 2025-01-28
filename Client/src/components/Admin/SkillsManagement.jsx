import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSkills, addSkill, updateSkill, deleteSkill, setLoading, setError } from '../../redux/Slice/skillSlice';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { fetchSkills } from '../../redux/Store/fetching.js';
import SkillsSkeleton from './Skeletons/SkillsSkeleton';

const SkillsManagement = () => {
  const { skills } = useSelector(state => state.skill);
  const { isLoading } = useSelector(state => state.skill);
  const dispatch = useDispatch();

  // Predefined skill icons/logos mapping
  const skillIcons = {
    'React': '/api/placeholder/32/32',
    'JavaScript': '/api/placeholder/32/32',
    'Python': '/api/placeholder/32/32',
    'Node.js': '/api/placeholder/32/32',
    'HTML': '/api/placeholder/32/32',
    'CSS': '/api/placeholder/32/32',
    'TypeScript': '/api/placeholder/32/32',
    'Angular': '/api/placeholder/32/32',
    'Vue': '/api/placeholder/32/32',
    'Docker': '/api/placeholder/32/32',
    'AWS': '/api/placeholder/32/32',
    'Git': '/api/placeholder/32/32'
  };

  useEffect(() => {
    fetchSkills(dispatch);
  }, []);

  const [editingSkill, setEditingSkill] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const initialSkillState = {
    name: '',
    proficiency: 0,
    category: '',
    logo: ''
  };

  const [newSkill, setNewSkill] = useState(initialSkillState);

  const handleDeleteSkill = async (id) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.delete(`http://localhost:5000/deleteSkill/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(deleteSkill(id));
      toast.success('Skill deleted successfully');
    } catch (error) {
      console.log('handleDeleteSkill error>>>>', error);
      toast.error('Skill deletion failed');
    } finally {
      dispatch(setLoading(false));
      fetchSkills(dispatch);
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewSkill({ ...newSkill, logo: e.target.result });
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSkill = async () => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append('name', newSkill.name);
      formData.append('proficiency', newSkill.proficiency);
      formData.append('category', newSkill.category);
      
      if (selectedFile) {
        formData.append('logo', selectedFile);
      } else if (skillIcons[newSkill.name]) {
        formData.append('logo', skillIcons[newSkill.name]);
      }

      if (editingSkill) {
        const res = await axios.put(`http://localhost:5000/updateSkill/${editingSkill._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        dispatch(updateSkill(res.data.skill));
        toast.success('Skill updated successfully');
        setEditingSkill(null);
      } else {
        const res = await axios.post('http://localhost:5000/skills', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        dispatch(addSkill(res.data.skill));
        toast.success('Skill added successfully');
      }
      setIsAdding(false);
      setNewSkill(initialSkillState);
      setSelectedFile(null);
    } catch (error) {
      toast.error('Skill operation failed');
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
      fetchSkills(dispatch);
    }
  };

  // Suggested skills for autocomplete
  const suggestedSkills = Object.keys(skillIcons);

  return (
    <>
    {isLoading?<SkillsSkeleton/>:
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Skills</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Skill
          </button>
        )}
      </div>

      {/* Add/Edit Skill Form */}
      {(isAdding || editingSkill) && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-4">
            {/* Logo Upload Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Skill Logo</label>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 relative">
                  <img
                    src={newSkill.logo || '/api/placeholder/32/32'}
                    alt="Skill logo preview"
                    className="w-full h-full object-contain rounded-lg border p-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer bg-white px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 inline-flex items-center gap-2">
                    <Upload className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Choose Logo</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </label>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-500">{selectedFile.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Skill Name</label>
              <input
                type="text"
                list="skill-suggestions"
                placeholder="Skill Name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({
                  ...newSkill,
                  name: e.target.value,
                  logo: newSkill.logo || skillIcons[e.target.value] || '/api/placeholder/32/32'
                })}
                className="w-full p-2 border rounded-md"
              />
              <datalist id="skill-suggestions">
                {suggestedSkills.map(skill => (
                  <option key={skill} value={skill} />
                ))}
              </datalist>
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  placeholder="Category (e.g., Frontend, Backend)"
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSaveSkill}
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                {editingSkill ? 'Update' : 'Add'}
                {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingSkill(null);
                  setNewSkill(initialSkillState);
                  setSelectedFile(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills List */}
      <div className="grid gap-4">
        {skills.map(skill => (
          <div key={skill._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={`http://localhost:5000${skill.logo}`}
                  alt={`${skill.name} logo`}
                  className="w-8 h-8 object-contain"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{skill.name}</h3>
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                      {skill.category}
                    </span>
                  </div>
                  
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    setIsAdding(true);
                    setEditingSkill(skill);
                    setNewSkill(skill);
                  }}
                  className="text-blue-500 p-1 hover:bg-blue-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteSkill(skill._id)}
                  className="text-red-500 p-1 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>}
    </>
  );
};

export default SkillsManagement;
