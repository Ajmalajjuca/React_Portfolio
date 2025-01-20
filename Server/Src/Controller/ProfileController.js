import Profile from '../Model/Profile.js';

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.find();
        res.status(200).json({ message: "Profile fetched successfully", profile });
    } catch (error) {
        console.log('getProfile error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const postProfile = async (req, res) => {
    const { name, title, bio, journey, aboutMe, email, phone,} = req.body;
    console.log('req.body>>>>', req.body);
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    if (!name || !title  || !email || !phone ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const avatarPath = '/uploads/' + file.filename;
    console.log('avatarPath>>>>', avatarPath);
    
    try {
        const newProfile = new Profile({ name, title, bio, journey, aboutMe, email, phone, avatar: avatarPath, });
        await newProfile.save();
        res.status(201).json({ message: "Profile created successfully", profile: newProfile });
    } catch (error) {
        console.log('postProfile error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { name, title, bio, journey, aboutMe, email, phone, avatar } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const avatarPath = '/uploads/' + file.filename;
    console.log('avatarPath>>>>', avatarPath);
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(id, { name, title, bio, journey, aboutMe, email, phone, avatar: avatarPath }, { new: true });
        res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
        console.log('updateProfile error>>>>', error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
