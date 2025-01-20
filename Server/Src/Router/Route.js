import express from 'express';
import { postProjects, getProjects, deleteProject, updateProject } from '../Controller/ProjectController.js';
import { postSkills, getSkills, deleteSkill, updateSkill } from '../Controller/SkillController.js';
import { postProfile, getProfile, updateProfile } from '../Controller/ProfileController.js';
import upload from '../utils/multer.js';

const router = express.Router();


// Projects
router.post('/projects', upload.single('image'), postProjects);
router.get('/getProjects', getProjects);
router.delete('/deleteProject/:id', deleteProject);
router.put('/updateProject/:id', upload.single('image'), updateProject);

// Skills
router.post('/skills', upload.single('logo'), postSkills);
router.get('/getSkills', getSkills);
router.delete('/deleteSkill/:id', deleteSkill);
router.put('/updateSkill/:id', upload.single('logo'), updateSkill);

// Profile
router.post('/profile', upload.single('avatar'), postProfile);
router.get('/profile', getProfile);
router.put('/profile/:id', upload.single('avatar'), updateProfile);

export default router;