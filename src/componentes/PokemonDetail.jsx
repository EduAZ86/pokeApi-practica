import React from "react";
import { useState, useEffect } from 'react';
import { getPokemonDetail } from '../services/pokeapi';
import { FaRegStar } from "react-icons/fa";


function PokemonDetail({name}) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [esFavorito, setEsFavorito] = useState(false);

  const addFavoritos = (name) => {
    let favoritosActuales = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favoritosActuales.includes(name)) {
      favoritosActuales = favoritosActuales.filter(fav => fav !== name);
      console.log(`${name} eliminado de favoritos`);
      setEsFavorito(false);
    } else {
      favoritosActuales.push(name);
      console.log(`${name} agregado a favoritos`);
      setEsFavorito(true);
    }
    localStorage.setItem('favorites', JSON.stringify(favoritosActuales));
    console.log("Lista de favoritos:", localStorage.getItem('favorites'));
  };

useEffect(() => {
    const favoritosActuales = JSON.parse(localStorage.getItem('favorites')) || [];
    const existeEnFavoritos = favoritosActuales.includes(name);
    setEsFavorito(existeEnFavoritos);
  }, [name]);

  useEffect(() => {
    async function load() {
      setLoading(true);
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
    <div style={{display:'flex', flexDirection:'column'}}>
     <img src={pokemon.sprites.other["official-artwork"].front_default} 
     alt={pokemon.name}
     />
     <button style={{backgroundColor:'black', width:'40px'}}
     onClick={()=> addFavoritos(name)}
     ><FaRegStar style={{ color: esFavorito ? 'gold' : 'white' }} /></button>
        
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