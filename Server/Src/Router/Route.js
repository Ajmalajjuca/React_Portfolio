import express from 'express';
import { postProjects, getProjects, deleteProject, updateProject } from '../Controller/ProjectController.js';
import { postSkills, getSkills, deleteSkill, updateSkill } from '../Controller/SkillController.js';
import { postProfile, getProfile, updateProfile, sendOtp, verifyOtp } from '../Controller/ProfileController.js';
import { authMiddleware } from '../Middleware/auth.js'; 
import upload from '../utils/multer.js';

const router = express.Router();


// Projects
router.post('/projects', authMiddleware, upload.single('image'), postProjects);
router.get('/getProjects', getProjects);
router.delete('/deleteProject/:id', authMiddleware, deleteProject);
router.put('/updateProject/:id', authMiddleware, upload.single('image'), updateProject);

// Skills
router.post('/skills', authMiddleware, upload.single('logo'), postSkills);
router.get('/getSkills', getSkills);
router.delete('/deleteSkill/:id', authMiddleware, deleteSkill);
router.put('/updateSkill/:id', authMiddleware, upload.single('logo'), updateSkill);

// Profile
router.post('/profile', authMiddleware, upload.single('avatar'), postProfile);
router.get('/profile', getProfile);
router.put('/profile/:id', authMiddleware, upload.single('avatar'), updateProfile);

// Two Factor Auth
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

export default router;