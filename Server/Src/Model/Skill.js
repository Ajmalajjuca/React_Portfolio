import mongoose from 'mongoose';
const skillSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  category: { type: String, required: true, trim: true },
  logo: { type: String, required: true, match: /^https?:\/\/.*/ }
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
