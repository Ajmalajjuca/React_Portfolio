import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Link as LinkIcon, ExternalLink, Github } from 'lucide-react';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, addProject, updateProject, deleteProject, setLoading, setError } from '../../redux/Slice/pojectSlice';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import { fetchProjects } from '../../redux/Store/fetching';
import ProjectSkeleton from './Skeletons/ProjectSkeleton';


const ProjectsManagement = () => {
  const { projects } = useSelector(state => state.project);
  const { isLoading } = useSelector(state => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProjects(dispatch);
  }, []);
    


  const [editingProject, setEditingProject] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const initialProjectState = {
    title: '',
    description: '',
    image: '',
    link: '',
    githubLink: '', // Added GitHub link field
    technologies: []
  };

  const [newProject, setNewProject] = useState(initialProjectState);

  const handleDeleteProject = async (id) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.delete(`https://react-portfolio-server-iota.vercel.app/deleteProject/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(deleteProject(id));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.log('handleDeleteProject error>>>>', error);
      toast.error('Project deletion failed');
    } finally {
      dispatch(setLoading(false));
      fetchProjects(dispatch);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProject({ ...newProject, image: e.target.result });
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = async () => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append('title', newProject.title);
      formData.append('description', newProject.description);
      formData.append('link', newProject.link);
      formData.append('githubLink', newProject.githubLink); // Added GitHub link
      formData.append('technologies', newProject.technologies.join(','));
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      if (editingProject) {
        const res = await axios.put(`https://react-portfolio-server-iota.vercel.app/updateProject/${editingProject._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        dispatch(updateProject(res.data.project));
        toast.success('Project updated successfully');
        setEditingProject(null);
        setIsAdding(false);
      } else {
        const res = await axios.post('https://react-portfolio-server-iota.vercel.app/projects', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
        });
        dispatch(addProject(res.data.project));
        toast.success('Project added successfully');
        setIsAdding(false);
      }
      setNewProject(initialProjectState);
      setSelectedFile(null);
    } catch (error) {
      toast.error('Project operation failed');
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
      fetchProjects(dispatch);
    }
  };

  return (
    <>
    {isLoading?<ProjectSkeleton/>:
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Projects</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Project
          </button>
        )}
      </div>

      {/* Add/Edit Project Form */}
      {(isAdding || editingProject) && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-4">
            {/* Image Upload Section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Image</label>
              <div className="flex items-start gap-4">
                <div className="w-48 h-32 relative">
                  <img
                    src={newProject.image}
                    alt="Project preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                </div>
                <div className="flex-1">
                  <label className="cursor-pointer bg-white px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 inline-flex items-center gap-2">
                    <Upload className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Choose Image</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-gray-500">{selectedFile.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full p-2 border rounded-md"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Live Demo Link</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newProject.link}
                  onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={newProject.githubLink}
                  onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Technologies</label>
              <input
                type="text"
                placeholder="React, Node.js, MongoDB..."
                value={newProject.technologies.join(', ')}
                onChange={(e) => setNewProject({
                  ...newProject,
                  technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSaveProject}
                className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                {editingProject ? 'Update' : 'Add'}
                {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setEditingProject(null);
                  setNewProject(initialProjectState);
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

      {/* Projects List */}
      <div className="grid gap-6">
        {projects.map(project => (
          <div key={project._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-48">
              <img
                src={`http://localhost:5000${project.image}`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => {
                    setIsAdding(true);
                    setEditingProject(project);
                    setNewProject(project);
                  }}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <Edit className="h-4 w-4 text-blue-500" />
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mt-1">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>}
    </>
  );
};

export default ProjectsManagement;
