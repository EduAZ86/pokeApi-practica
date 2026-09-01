import {useState} from 'react'
import './App.css'
import PokemonList from './componentes/PokemonList'
import PokemonDetail from './componentes/PokemonDetail'
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

function App() {

const [page, setPage]= useState(0);
const [selectedPokemon, setSelectedPokemon] = useState(null);

function nextPage(){
  const nextPage = page+1;
  setPage(nextPage);
};

function prevPage(){
  const prevPage= page-1;
  setPage(prevPage);
};

const pageView = page+1;
console.log('Page index', pageView);

  return (
    <div className='App'>
      <div className='contenedor-principal'>
       <div className='contenedor-pantalla'>
         <div className='contenedor-lista'>
        lista
        <PokemonList 
        page={page}
        onSelectPokemon={setSelectedPokemon}/>

      </div>
      <div className='contenedor-imagen'>
        <PokemonDetail name={selectedPokemon}/>
      </div>
       </div>
       
      <div className='contenedor-botones'>

        <div className='visor-top'>
          <span> Página: { pageView }</span>
        </div>
        <div className='menu'>
          <div className='menu-a'>
            <button onClick={prevPage}>
          <BsChevronLeft />
          </button>
          <button onClick={nextPage}> 
          <BsChevronRight />
        </button>     

          </div>
          <div className='visor-bot'>
            <label>Usuario</label>
            <input></input>
            <labe>Password</labe>
            <input></input>


          </div>
          <div className='menu-b'>

          </div>


        </div>
        
        
        
      </div>
      </div>
      

      
    </div>
  )
}

export default App
