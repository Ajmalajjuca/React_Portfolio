import mongoose from 'mongoose';
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  category: { type: String, required: true, trim: true },
  logo: { type: String, default:""  }
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill
