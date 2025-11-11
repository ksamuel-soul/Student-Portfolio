import React from 'react'
import SkillTag from './SkillTag'

export default function ProfileHeader({ user, onAddProject, onAddAch, q, setQ, cat, setCat }) {
  return (
    <>
      <div className="header">
        <img src={user.profilepic || 'https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM='} alt="Profile" />
        <div>
          <h2>{user.name}</h2>
          <p>{user.branch}</p>
          <p>{user.bio}</p>
          <div>{(user.skills || []).map((s, i) => <SkillTag key={i} text={s} />)}</div>
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <button className="btn" onClick={onAddProject}>
            + Project
          </button>
          <button className="btn" onClick={onAddAch}>
            + Achievement
          </button>
        </div>
      </div>
      <div className="toolbar">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search projects..." />
        <select value={cat} onChange={e => setCat(e.target.value)}>
          <option value="all">All</option>
          <option value="web">Web</option>
          <option value="ml">ML/AI</option>
          <option value="systems">Systems</option>
        </select>
      </div>
    </>
  )
}
