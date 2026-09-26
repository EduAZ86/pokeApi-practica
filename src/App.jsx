import {useState, useEffect} from 'react'
import './App.css'
import PokemonList from './componentes/PokemonList'
import PokemonDetail from './componentes/PokemonDetail'
import Login from './componentes/Login'
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

function App() {

const [page, setPage]= useState(0);
const [selectedPokemon, setSelectedPokemon] = useState(null);
const [usuarioLogueado, setUsuarioLogueado] = useState(null);
const [estaHablando, setEstaHablando] = useState(false);

//Paginacion

function nextPage(){
  const nextPage = page+1;
  setPage(nextPage);
};

function prevPage(){
  const prevPage= page-1;
  setPage(prevPage);
};

useEffect(() => {
    if (!selectedPokemon) return;
    setEstaHablando(true);

    const temporizador = setTimeout(() => {
      setEstaHablando(false);
    }, 3000);

    return () => clearTimeout(temporizador);

  }, [selectedPokemon]);


const pageView = page+1;
console.log('Page index', pageView);

  return (
    <div className='App'>
      <div className='contenedor-principal'>
        <div 
  className="luz-pokedex" 
  style={{ animation: estaHablando ? "parpadeo 0.5s infinite ease-in-out" : "none" }}>
  </div>
       <div className='contenedor-pantalla'>
         <div className='contenedor-lista'>Lista
        <PokemonList 
        page={page}
        onSelectPokemon={setSelectedPokemon}/>

      </div>
      <div className='contenedor-imagen'>Pokemon
        <PokemonDetail name={selectedPokemon}/>
        
      </div>
      
       </div>
       
      <div className='contenedor-botones'>

        <div className='visor-top'>
          <span> Página: { pageView }</span>
        </div>
        <div className='menu'>
          <div className='menu-a'>
            <button style={{height:'25px', width:'25px', fontWeight:'bolder', color:'rgb(36, 36, 36)',  backgroundColor:'rgb(70, 70, 70)' }} onClick={prevPage}>
          <BsChevronLeft />
          </button>
          <button style={{height:'25px', width:'25px',color:'rgb(36, 36, 36)',backgroundColor:'rgb(70, 70, 70)'}}  onClick={nextPage}> 
          <BsChevronRight />
        </button>     

          </div>
          <div className='visor-bot'>
              {usuarioLogueado ? (

                <div style={{ color: 'white', fontSize: '14px', textAlign: 'center' }}>
                  ¡Hola, {usuarioLogueado}! 👋
                </div>
              ) : (
                <Login onLoginSuccess={setUsuarioLogueado} />
              )}
            </div>
          
          <div className='menu-b'>
            <button 
            style={{marginLeft:'15px', width:'30px', height:'30px',borderRadius:'100%', backgroundColor:'red'}} ></button>

            <button 
            style={{marginLeft:'25px',width:'40px', height:'40px',borderRadius:'50%', backgroundColor:'green'}} ></button>

          </div>


        </div>
        
        
        
      </div>
      </div>
      

      
    </div>
  )
}

export default App
