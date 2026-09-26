import React from "react";
import PokemonDetail from "./PokemonDetail";


function PokeCard({ name, onSelect }) {
    function seleccionarPokemon() {
        console.log(name);
    }

    return (
        <div className="contenedor-pokecard">
            <button style={{width:'90px', backgroundColor:'black', color:'white'}} onClick={() => onSelect(name)}>
    {name}
</button>
            
        </div>
    );
}

export default PokeCard;