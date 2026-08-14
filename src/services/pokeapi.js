import React from "react";
const BASE_URL = 'https://pokeapi.co/api/v2';
export async function getPokemonList(limit = 20, offset = 0) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error('Error al obtener la lista');
  return response.json();
};

export async function getPokemonDetail(idOrName) {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  if (!response.ok) throw new Error('Pokemon no encontrado');
  return response.json();
};