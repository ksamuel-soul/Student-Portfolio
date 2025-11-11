import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  bio: { type: String },
  skills: [String],
  profilepic: { type: String }
})

export default mongoose.model('User', userSchema)
