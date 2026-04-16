function Card({ titulo, descripcion }) {
  return (
    <div className="card">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  );
}

export default Card;