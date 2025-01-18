import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  position: { type: String, required: true, trim: true },
  bio: { type: String },
  journey: { type: String },
  aboutMe: { type: String },
  email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
  phone: { type: String },
  location: { type: String },
  avatar: { type: String },
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    portfolio: { type: String }
  }
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
