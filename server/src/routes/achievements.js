import express from 'express'
import Achievement from '../models/Achievement.js'
const router = express.Router()

// Add Achievement
router.post('/', async (req, res) => {
  try {
    const achievement = new Achievement(req.body)
    const saved = await achievement.save()
    res.json(saved)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get Achievements
router.get('/', async (req, res) => {
  try {
    const filter = req.query.user ? { userid: req.query.user } : {}
    const list = await Achievement.find(filter)
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update Achievement
router.put('/:id', async (req, res) => {
  try {
    const updated = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete Achievement
router.delete('/:id', async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id)
    res.json({ message: 'Achievement deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
