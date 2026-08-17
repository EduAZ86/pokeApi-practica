import { useState, useEffect } from 'react';
import { getPokemonList } from '../services/pokeapi';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getPokemonList(20, 0);
      setPokemon(data.results);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div>Cargando...</div>;
  return (
    <div>
      {pokemon.map(p => (
        <div key={p.name}>{p.name}</div>
      ))}
    </div>
  );
}

export default PokemonList;