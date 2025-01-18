import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';

const SkillsManagement = () => {
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

  const [skills, setSkills] = useState([
    { id: 1, name: 'React', proficiency: 90, category: 'Frontend', logo: '/api/placeholder/32/32' },
    { id: 2, name: 'Node.js', proficiency: 85, category: 'Backend', logo: '/api/placeholder/32/32' },
    { id: 3, name: 'Python', proficiency: 80, category: 'Backend', logo: '/api/placeholder/32/32' }
  ]);
  
  const [editingSkill, setEditingSkill] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const initialSkillState = {
    name: '',
    proficiency: 0,
    category: '',
    logo: '/api/placeholder/32/32'
  };

  const [newSkill, setNewSkill] = useState(initialSkillState);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewSkill({ ...newSkill, logo: e.target.result });
        setSelectedFile(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSkill = () => {
    const skillToSave = {
      ...newSkill,
      logo: newSkill.logo || skillIcons[newSkill.name] || '/api/placeholder/32/32'
    };

    if (editingSkill) {
      setSkills(skills.map(s => s.id === editingSkill.id ? {...skillToSave, id: editingSkill.id} : s));
      setEditingSkill(null);
    } else {
      setSkills([...skills, { ...skillToSave, id: Date.now() }]);
      setIsAdding(false);
    }
    setNewSkill(initialSkillState);
    setSelectedFile(null);
  };

  // Suggested skills for autocomplete
  const suggestedSkills = Object.keys(skillIcons);

  return (
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
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-4">
            {/* Logo Upload Section */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 relative">
                <img
                  src={newSkill.logo}
                  alt="Skill logo preview"
                  className="w-full h-full object-contain border rounded-lg p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Logo
                </label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer bg-white px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
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
                    <span className="text-sm text-gray-500">{selectedFile}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
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

            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Proficiency (0-100)"
                value={newSkill.proficiency}
                onChange={(e) => setNewSkill({...newSkill, proficiency: parseInt(e.target.value)})}
                className="flex-1 p-2 border rounded-md"
                min="0"
                max="100"
              />
              <input
                type="text"
                placeholder="Category"
                value={newSkill.category}
                onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                className="flex-1 p-2 border rounded-md"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSaveSkill}
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Save className="h-4 w-4" /> Save
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
          <div key={skill.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={skill.logo}
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
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Proficiency: {skill.proficiency}%
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    setEditingSkill(skill);
                    setNewSkill(skill);
                  }}
                  className="text-blue-500 p-1 hover:bg-blue-50 rounded"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setSkills(skills.filter(s => s.id !== skill.id))}
                  className="text-red-500 p-1 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManagement;