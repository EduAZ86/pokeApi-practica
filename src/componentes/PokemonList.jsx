import { useState, useEffect } from 'react';
import { getPokemonList } from '../services/pokeapi';
import PokeCard from './PokeCard';

const LIMIT=20;

function PokemonList({page, onSelectPokemon}) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const offset = page* LIMIT;
      const data = await getPokemonList(LIMIT, offset);
      setPokemon(data.results);
      setLoading(false);
    }
    load();
  }, [page]);

  if (loading) return <div>Cargando...</div>;
  return (
    <div>
      {pokemon.map(p => (
        <PokeCard
         key={p.name}
         name={p.name}
         onSelect={onSelectPokemon} />
      ))}
    </div>
  );
}

export default PokemonList;