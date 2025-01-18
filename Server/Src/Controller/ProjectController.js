import Project from '../Model/Project.js';
import path from 'path';

export const postProjects = async (req, res) => {
    console.log('req.bodys>>>>', req.body);
    const file = req.file;
    console.log('file>>>>', file);
    const { title, description, link, technologies } = req.body;
    if (!title || !description || !link || !file || !technologies) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const filePath = path.join('uploads', file.filename);
    console.log('filePath>>>>', filePath);
    try {
        const newProject = new Project({
            title,
            description,
            link,
            technologies: technologies.split(','),
            image: '/uploads/' + req.file.filename, // Adjust the path based on your server setup
        });
        console.log('newProject>>>>', newProject);
        const savedProject = await newProject.save();

        res.status(201).json({ message: "Project created successfully", project: savedProject });
    } catch (error) {
        console.log('postProjects error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ message: "Projects fetched successfully", projects });
    } catch (error) {
        console.log('getProjects error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

