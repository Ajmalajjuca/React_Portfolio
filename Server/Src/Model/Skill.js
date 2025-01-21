import mongoose from 'mongoose';
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  logo: { type: String, default:""  }
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill
