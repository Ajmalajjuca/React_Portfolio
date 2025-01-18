import express from 'express';
import { postProjects, getProjects, deleteProject, updateProject } from '../Controller/ProjectController.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/projects', upload.single('image'), postProjects);
router.get('/getProjects', getProjects);
router.delete('/deleteProject/:id', deleteProject);
router.put('/updateProject/:id', upload.single('image'), updateProject);
export default router;