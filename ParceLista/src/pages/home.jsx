import Card from "../components/Card";
import imagen from "../assets/react.svg";

function Home() {
  const tareas = [
    { titulo: "Estudiar React", descripcion: "Repasar componentes" },
    { titulo: "Hacer tarea", descripcion: "Entregar proyecto SPA" },
  ];

  return (
    <div className="container">
      <img src={imagen} width="120" />

      {tareas.map((tarea, index) => (
        <Card
          key={index}
          titulo={tarea.titulo}
          descripcion={tarea.descripcion}
        />
      ))}
    </div>
  );
}

export default Home;