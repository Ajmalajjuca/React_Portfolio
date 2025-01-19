import Skill from '../Model/Skill.js';

export const postSkills = async (req, res) => {
    const { name, proficiency, category } = req.body;
    const file = req.file;
    console.log('req.body>>>',req.body);
    console.log('req.file>>>',req.file);
    
    if (!name || !proficiency || !category ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        console.log('file.filename>>>',file.filename);
        
        const newSkill = new Skill({ name, proficiency, category, logo: '/uploads/' + file.filename });
        const savedSkill = await newSkill.save();
        console.log('savedSkill>>>',savedSkill);
        res.status(200).json({ message: "Skill added successfully", skill: savedSkill });
    } catch (error) {
        console.log('postSkills error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json({ message: "Skills fetched successfully", skills });
    } catch (error) {
        console.log('getSkills error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        await Skill.findByIdAndDelete(id);
        res.status(200).json({ message: "Skill deleted successfully" });
    } catch (error) {
        console.log('deleteSkill error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { name, proficiency, category } = req.body;
    const file = req.file;
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(id, { name, proficiency, category, logo: '/uploads/' + file.filename }, { new: true });
        res.status(200).json({ message: "Skill updated successfully", skill: updatedSkill });
    } catch (error) {
        console.log('updateSkill error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
