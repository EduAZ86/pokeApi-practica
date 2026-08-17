import React from "react";
import { useState, useEffect } from 'react';
import { getPokemonDetail } from '../services/pokeapi';

function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      console.log("1. Empezó load");
      const data = await getPokemonDetail("10");
      console.log("2. Llegaron los datos:", data);
      setPokemon(data);
      setLoading(false);
    }
    load();
  }, []);
    if (loading) return <div>Cargando...</div>;

  return (
    <div>
     <img src={pokemon.sprites.other["official-artwork"].front_default} 
     alt={pokemon.name}
     />
      <h2>{pokemon.name}</h2>

      <p>ID: {pokemon.id}</p>

      <h3>Tipos</h3>
      {pokemon.types.map(type => (
        <p key={type.type.name}>{type.type.name}</p>
      ))}

      <h3>Estadísticas</h3>
      {pokemon.stats.map(stat => (
        <p key={stat.stat.name}>
          {stat.stat.name}: {stat.base_stat}
        </p>
      ))}

      <h3>Habilidades</h3>
      {pokemon.abilities.map(ability => (
        <p key={ability.ability.name}>
          {ability.ability.name}
        </p>
      ))}
    </div>
  );
}

export default PokemonDetail;