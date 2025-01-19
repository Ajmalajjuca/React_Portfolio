import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String,default:''},
    link: { type: String, required: true, match: /^https?:\/\/.*/ },
    technologies: { type: [String], required: true },
    githubLink: { type: String, match: /^https?:\/\/.*/ }
});

const Project = mongoose.model("Project", projectSchema);

export default Project;