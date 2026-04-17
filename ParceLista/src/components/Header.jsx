import { useState, useEffect } from "react";

const navItems = [
  { icon: "◈", label: "Dashboard", path: "/" },
  { icon: "✦", label: "Mis tareas", path: "/tasks" },
  { icon: "◷", label: "Historial", path: "/history" },
  { icon: "◎", label: "Ajustes", path: "/settings" },
];

export default function Header({ activePath = "/", onNavigate }) {
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (n) => String(n).padStart(2, "0");
  const clock = `${fmt(time.getHours())}:${fmt(time.getMinutes())}:${fmt(time.getSeconds())}`;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">📋</div>
        <span className="logo-text">ParceLista</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item${activePath === item.path ? " active" : ""}`}
            onClick={() => onNavigate && onNavigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <span style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.5px"
          }}>
            {clock}
          </span>
        </div>
        <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
          <span style={{ fontSize: "15px" }}>{darkMode ? "☀️" : "🌙"}</span>
          <span>{darkMode ? "Modo claro" : "Modo oscuro"}</span>
        </button>
      </div>
    </aside>
  );
}