import express from 'express'
import Project from '../models/Project.js'
const router = express.Router()

// Create new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body)
    const saved = await project.save()
    res.json(saved)
  } catch (err) {
    console.error('❌ Project save error:', err.message);
    res.status(500).json({ error: err.message })
  }
})

// Get all projects for a user
router.get('/', async (req, res) => {
  try {
    const filter = req.query.user ? { userid: req.query.user } : {}
    const projects = await Project.find(filter)
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update a project
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete a project
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
