import React from 'react'
import ProjectCard from './ProjectCard'

export default function PortfolioGrid({ items, onEdit, onDelete }) {
  return (
    <div className="grid">
      {items.map(p => (
        <ProjectCard key={p._id} p={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
