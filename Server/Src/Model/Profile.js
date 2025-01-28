import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  bio: { type: String },
  journey: { type: String },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /\S+@\S+\.\S+/ 
  },
  phone: { type: String },
  avatar: { type: String },
  

  
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    instagram: { type: String }
  },
  
  contributions: {
    leetcode: { type: String },
    github: { type: String }
  }
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;