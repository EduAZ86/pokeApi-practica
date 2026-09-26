import { useState, useEffect } from 'react';
import { getPokemonList } from '../services/pokeapi';
import PokeCard from './PokeCard';

const LIMIT=20;

function PokemonList({page, onSelectPokemon}) {
  const [pestanaActiva, setPestanaActiva] = useState("todos");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const offset = page* LIMIT;
      const data = await getPokemonList(LIMIT, offset);
      setPokemon(data.results);
      setLoading(false);
    }
    load();
  }, [page]);

  if (loading) return <div>Cargando...</div>;
  const nombresAMostrar = pestanaActiva === "todos"
    ? pokemon.map(p => p.name)
    : JSON.parse(localStorage.getItem('favorites')) || [];
  return (

    <div>
      <div style={{height:'35px', display: 'flex', gap: '1px', marginBottom: '1px' }}>
        <button 
          onClick={() => setPestanaActiva("todos")}
          style={{color:'white', backgroundColor:'black', fontWeight: pestanaActiva === "todos" ? "bold" : "normal" }}
        >
          Todos
        </button>
        <button 
          onClick={() => setPestanaActiva("favoritos")}
          style={{color:'white', backgroundColor:'black', fontWeight: pestanaActiva === "favoritos" ? "bold" : "normal" }}
        >
          Fav⭐
        </button>
      </div>
      {nombresAMostrar.map(nombre => (
        <PokeCard
          key={nombre}
          name={nombre}
          onSelect={onSelectPokemon} 
        />
      ))}
      
      {pestanaActiva === "favoritos" && nombresAMostrar.length === 0 && (
        <p style={{ color: 'gray', fontSize: '14px' }}>No tienes pokémones favoritos aún.</p>
      )}
    </div>
  );
}

export default PokemonList;