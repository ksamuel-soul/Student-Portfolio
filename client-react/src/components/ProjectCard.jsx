import React from 'react'

export default function ProjectCard({ p, onEdit, onDelete }) {
  return (
    <article className="card">
      <h3>{p.title}</h3>
      <p>{p.description}</p>
      <div>{(p.techstack || []).map((t, i) => <span key={i} className="tag">{t}</span>)}</div>
      <div className="card-actions">
        {p.repolink && (
          <a href={p.repolink} target="_blank" rel="noreferrer" className="repo">
            Repo
          </a>
        )}
        {p.demolink && (
          <a href={p.demolink} target="_blank" rel="noreferrer" className="demo">
            Demo
          </a>
        )}
        <button className="edit" onClick={() => onEdit(p)}>
          Edit
        </button>
        <button className="delete" onClick={() => onDelete(p._id)}>
          Delete
        </button>
      </div>
    </article>
  )
}
