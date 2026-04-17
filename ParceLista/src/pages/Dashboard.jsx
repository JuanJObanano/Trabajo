import { useState } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from "recharts";

const INITIAL_TASKS = [
  { id: 1, text: "Entregar informe de biología", done: true,  tag: "Estudio" },
  { id: 2, text: "Revisar apuntes de matemáticas", done: false, tag: "Estudio" },
  { id: 3, text: "Preparar presentación del equipo", done: false, tag: "Trabajo" },
];

const weekData = [
  { day: "Lun", tareas: 4, completadas: 3 },
  { day: "Mar", tareas: 6, completadas: 4 },
  { day: "Mié", tareas: 3, completadas: 3 },
  { day: "Jue", tareas: 7, completadas: 5 },
  { day: "Vie", tareas: 5, completadas: 2 },
  { day: "Sáb", tareas: 2, completadas: 1 },
  { day: "Dom", tareas: 1, completadas: 1 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff", border: "1px solid rgba(26,26,46,0.08)",
      borderRadius: 8, padding: "10px 14px", fontSize: 13,
    }}>
      <p style={{ fontWeight: 600, marginBottom: 4, color: "#1A1A2E" }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === "completadas" ? "✓ Completadas" : "● Tareas"}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [input, setInput] = useState("");

  const total     = tasks.length;
  const done      = tasks.filter((t) => t.done).length;
  const pending   = total - done;
  const pct       = total > 0 ? Math.round((done / total) * 100) : 0;

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));

  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: input.trim(), done: false, tag: "General" },
    ]);
    setInput("");
  };

  const today = new Date().toLocaleDateString("es-CO", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <main className="main-content">
      {/* Top bar */}
      <div className="topbar">
        <div className="page-header" style={{ margin: 0 }}>
          <h1>ParceLista</h1>
          <p style={{ textTransform: "capitalize" }}>{today}</p>
        </div>
        <span className="clock-badge">
          {pct}% completado hoy
        </span>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-label">Total tareas</div>
          <div className="stat-value">{total}</div>
          <span className="stat-badge total">📋 esta semana</span>
        </div>
        <div className="stat-card done">
          <div className="stat-label">Completadas</div>
          <div className="stat-value">{done}</div>
          <span className="stat-badge done">✓ muy bien</span>
        </div>
        <div className="stat-card pending">
          <div className="stat-label">Pendientes</div>
          <div className="stat-value">{pending}</div>
          <span className="stat-badge pending">⏳ por hacer</span>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-title">Progreso del día</span>
          <span className="progress-pct">{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <p style={{ fontSize: 12, color: "var(--text-light)", marginTop: 10 }}>
          {done} de {total} tareas completadas
        </p>
      </div>

      {/* Two-column below */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Tasks */}
        <div className="chart-section">
          <div className="section-title">Mis tareas</div>
          <div className="section-sub">Márcalas a medida que avanzas</div>

          <div className="add-task-row">
            <input
              className="task-input"
              placeholder="Nueva tarea..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <button className="btn-add" onClick={addTask}>+ Agregar</button>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div
                  className={`task-check${task.done ? " checked" : ""}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.done && "✓"}
                </div>
                <span className={`task-text${task.done ? " done" : ""}`}>
                  {task.text}
                </span>
                <span className="task-tag">{task.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="chart-section">
          <div className="section-title">Rendimiento semanal</div>
          <div className="section-sub">Tareas asignadas vs completadas</div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weekData} barGap={4} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,26,46,0.05)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: "var(--text-light)", fontFamily: "DM Sans" }}
                axisLine={false} tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--text-light)", fontFamily: "DM Sans" }}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(26,26,46,0.03)" }} />
              <Bar dataKey="tareas" fill="rgba(233,166,58,0.25)" radius={[4,4,0,0]} name="tareas" />
              <Bar dataKey="completadas" fill="#4DC991" radius={[4,4,0,0]} name="completadas" />
            </BarChart>
          </ResponsiveContainer>

          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(233,166,58,0.4)", display: "inline-block" }} />
              Asignadas
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "#4DC991", display: "inline-block" }} />
              Completadas
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}