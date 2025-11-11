import React, { useState, useEffect } from "react";
import ProfileHeader from "./components/ProfileHeader";
import PortfolioGrid from "./components/PortfolioGrid";
import AchievementModal from "./components/AchievementModal";

const API = "http://localhost:4000/api";
const USER_ID = "6912d88baaa87aac164bd9c3";

export default function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [ach, setAch] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [editing, setEditing] = useState(null);
  const [showAch, setShowAch] = useState(false);

  useEffect(() => {
    (async () => {
      const [u, p, a] = await Promise.all([
        fetch(`${API}/users/${USER_ID}`).then((r) => r.json()),
        fetch(`${API}/projects?user=${USER_ID}`).then((r) => r.json()),
        fetch(`${API}/achievements?user=${USER_ID}`).then((r) => r.json()),
      ]);
      setUser(u);
      setProjects(p);
      setAch(a);
    })();
  }, []);

  const view = projects.filter((p) => {
    const okQ = JSON.stringify(p).toLowerCase().includes(q.toLowerCase());
    const okC = cat === "all" || p.category === cat;
    return okQ && okC;
  });

  async function saveProject(form) {
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.techstack = payload.techstack
      ? payload.techstack.split(",").map((s) => s.trim())
      : [];
    payload.userid = USER_ID;
    const isEdit = editing && editing._id;
    const url = isEdit ? `${API}/projects/${editing._id}` : `${API}/projects`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const p = await res.json();
    setProjects((x) =>
      editing ? x.map((i) => (i._id === p._id ? p : i)) : [p, ...x]
    );
    setEditing(null);
  }

  async function delProject(id) {
    await fetch(`${API}/projects/${id}`, { method: "DELETE" });
    setProjects((x) => x.filter((i) => i._id !== id));
  }

  return (
    <div className="app">
      {user && (
        <ProfileHeader
          user={user}
          onAddProject={() => setEditing({})}
          onAddAch={() => setShowAch(true)}
          q={q}
          setQ={setQ}
          cat={cat}
          setCat={setCat}
        />
      )}

      <PortfolioGrid items={view} onEdit={setEditing} onDelete={delProject} />

      <div className="achievements-section">
        <h2 className="section-title">🏆 Achievements</h2>

        {ach.length === 0 ? (
          <p className="empty-text">No achievements added yet.</p>
        ) : (
          <div className="grid">
            {ach.map((a) => (
              <div key={a._id} className="card">
                <h3>{a.title}</h3>
                <p className="date-text">{new Date(a.date).toDateString()}</p>
                <p>{a.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <div className="dialog" onClick={() => setEditing(null)}>
          <div className="card" onClick={(e) => e.stopPropagation()}>
            <h3>{editing._id ? "Edit Project" : "Add Project"}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveProject(e.currentTarget);
              }}
            >
              <input
                name="title"
                placeholder="Title"
                defaultValue={editing.title || ""}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                defaultValue={editing.description || ""}
                required
              />
              <input
                name="techstack"
                placeholder="Tech stack (comma separated)"
                defaultValue={(editing.techstack || []).join(", ")}
              />
              <input
                name="repolink"
                placeholder="Repo URL"
                defaultValue={editing.repolink || ""}
              />
              <input
                name="demolink"
                placeholder="Demo URL"
                defaultValue={editing.demolink || ""}
              />
              <select name="category" defaultValue={editing.category || "web"}>
                <option value="web">Web</option>
                <option value="ml">ML/AI</option>
                <option value="systems">Systems</option>
              </select>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button className="btn" type="submit">
                  Save
                </button>
                <button
                  className="btn warn"
                  type="button"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAch && (
        <AchievementModal
          onClose={() => setShowAch(false)}
          onSaved={(a) => {
            setAch((x) => [a, ...x]);
            setShowAch(false);
          }}
          userId={USER_ID}
        />
      )}
    </div>
  );
}
