import React, { useState } from 'react';

const API = 'http://localhost:4000/api';

export default function AchievementModal({ onClose, onSaved, userId }) {
  const [form, setForm] = useState({ title: '', date: '', description: '' });

  async function submit(e) {
    e.preventDefault();

    // Build valid JSON payload
    const payload = {
      title: form.title,
      date: form.date,
      description: form.description,
      userid: userId, // ✅ important!
    };

    console.log("🚀 Sending achievement:", payload);

    try {
      const res = await fetch(`${API}/achievements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // ✅ must stringify
      });

      if (!res.ok) {
        const errData = await res.text();
        console.error("❌ Server Error:", errData);
        alert("❌ Failed to save achievement: " + errData);
        return;
      }

      const saved = await res.json();
      console.log("✅ Saved achievement:", saved);

      onSaved(saved);
      onClose();
      alert("✅ Achievement added successfully!");
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert("❌ Error: " + err.message);
    }
  }

  return (
    <div className="dialog" onClick={onClose}>
      <div className="card" onClick={e => e.stopPropagation()}>
        <h3>Add Achievement</h3>
        <form onSubmit={submit}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            required
          />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn" type="submit">Save</button>
            <button className="btn warn" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
