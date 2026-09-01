import React from "react";
import { useState, useEffect } from 'react';
import { getPokemonDetail } from '../services/pokeapi';

function PokemonDetail({name}) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      console.log("1. Empezó load");
      const data = await getPokemonDetail(name);
      console.log("2. Llegaron los datos:", data);
      setPokemon(data);
      setLoading(false);
    }
    load();
  }, [name]);
    if (loading) return <div>Cargando...</div>;

  return (
    <div>
     <img src={pokemon.sprites.other["official-artwork"].front_default} 
     alt={pokemon.name}
     />
      <h3>{pokemon.name}</h3>

      <p>ID: {pokemon.id}</p>

      <h4>Tipos</h4>
      {pokemon.types.map(type => (
        <p key={type.type.name}>{type.type.name}</p>
      ))}

      <h4>Estadísticas</h4>
      {pokemon.stats.map(stat => (
        <p key={stat.stat.name}>
          {stat.stat.name}: {stat.base_stat}
        </p>
      ))}

      <h4>Habilidades</h4>
      {pokemon.abilities.map(ability => (
        <p key={ability.ability.name}>
          {ability.ability.name}
        </p>
      ))}
    </div>
  );
}

export default PokemonDetail;