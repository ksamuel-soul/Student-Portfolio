import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  techstack: [String],
  repolink: String,
  demolink: String,
  category: String
})

export default mongoose.model('Project', projectSchema)
