import React from 'react'
import './App.css'
import PokemonList from './componentes/PokemonList'
import PokemonDetail from './componentes/PokemonDetail'

function App() {
  return (
    <div className='App'>
      <div className='contenedor-principal'>
       <div className='contenedor-pantalla'>
         <div className='contenedor-lista'>
        lista
        <PokemonList/>

      </div>
      <div className='contenedor-imagen'>
        imagen
        <PokemonDetail/>
      </div>
       </div>
       
      <div className='contenedor-botones'>
        anterior/siguiente
      </div>
      </div>
      

      
    </div>
  )
}

export default App
