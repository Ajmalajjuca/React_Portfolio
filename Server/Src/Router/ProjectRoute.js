import express from 'express';
import { postProjects, getProjects } from '../Controller/ProjectController.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/projects', upload.single('image'), postProjects);
router.get('/getProjects', getProjects);

export default router;