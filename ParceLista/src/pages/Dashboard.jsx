import { useState, useEffect } from "react";

function Dashboard() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());
  const [tareas, setTareas] = useState(5);

  // reloj en tiempo real
  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  // simulación de tareas cambiando
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTareas(Math.floor(Math.random() * 10) + 1);
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard en Tiempo Real</h2>

      <div className="stats">
        <div className="stat">Hora: {hora}</div>
        <div className="stat">Tareas activas: {tareas}</div>
        <div className="stat">Estado: En línea</div>
      </div>
    </div>
  );
}

export default Dashboard;