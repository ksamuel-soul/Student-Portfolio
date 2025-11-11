import mongoose from 'mongoose'

const achievementSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: Date },
  description: String
})

export default mongoose.model('Achievement', achievementSchema)
