# Guia: Pokedex con React y PokéAPI

## Introduccion

**PokéAPI** es una API REST gratuita que contiene toda la informacion de los Pokemon. No requiere autenticacion y responde en formato JSON.

**URL Base:** `https://pokeapi.co/api/v2`

---

## Requisitos del Proyecto

### Obligatorios

| # | Requisito | Descripcion |
|---|-----------|-------------|
| 1 | **Listar Pokemon** | Mostrar una lista de Pokemon con su imagen y nombre |
| 2 | **Ver detalle** | Al hacer clic en un Pokemon, mostrar sus detalles completos (tipos, estadisticas, habilidades) |
| 3 | **Paginacion** | Crear botones para navegar entre paginas (anterior/siguiente) |
| 4 | **Favoritos** | Guardar Pokemon en una lista de favoritos usando localStorage |
| 5 | **Registro** | Crear una cuenta con email y contraseña almacenada en localStorage |
| 6 | **Login** | Iniciar sesion con las credenciales registradas |

### Creativos (libertad total)

Despues de completar los obligatorios, puedes agregar lo que quieras:
- Diseno visual atractivo
- Filtros por tipo de Pokemon
- Busqueda por nombre
- Animaciones y transiciones
- Modo oscuro/claro
- Comparacion de Pokemon
- Y cualquier otra idea que se te ocurra

---

## Endpoints de PokéAPI

### Lista de Pokemon (paginada)

```
GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
```

**Parametros:**
- `limit` - Cuantos resultados por pagina (default: 20)
- `offset` - Desde que resultado empezar

**Respuesta:**
```json
{
  "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    }
  ]
}
```

### Detalle de un Pokemon

```
GET https://pokeapi.co/api/v2/pokemon/{id}
GET https://pokeapi.co/api/v2/pokemon/{name}
```

**Ejemplos:**
- `pokemon/25` → Pikachu por ID
- `pokemon/pikachu` → Pikachu por nombre

**Respuesta (estructura principal):**
```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "sprites": {
    "front_default": "https://raw.githubusercontent.com/.../25.png",
    "other": {
      "official-artwork": {
        "front_default": "https://raw.githubusercontent.com/.../other/official-artwork/25.png"
      }
    }
  },
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "electric",
        "url": "https://pokeapi.co/api/v2/type/13/"
      }
    }
  ],
  "stats": [
    {
      "base_stat": 35,
      "stat": { "name": "hp" }
    },
    {
      "base_stat": 55,
      "stat": { "name": "attack" }
    }
  ],
  "abilities": [
    {
      "ability": { "name": "static" },
      "is_hidden": false
    }
  ]
}
```

### Lista de Tipos

```
GET https://pokeapi.co/api/v2/type
```

---

## Guia Paso a Paso

### Paso 1: Crear el servicio de API

Crea una carpeta `src/services/` y un archivo `pokeapi.js`:

```javascript
const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit = 20, offset = 0) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) throw new Error('Error al obtener la lista');
  return response.json();
}

export async function getPokemonDetail(idOrName) {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
  if (!response.ok) throw new Error('Pokemon no encontrado');
  return response.json();
}
```

### Paso 2: Listar Pokemon

Crea un componente `PokemonList.jsx` que:
1. Llame a `getPokemonList()` al montarse con `useEffect`
2. Guarde el resultado en estado con `useState`
3. Muestre una cuadricula de tarjetas

```jsx
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
```

### Paso 3: Ver detalle

Crea `PokemonDetail.jsx` que reciba un Pokemon y muestre:
- Imagen: `pokemon.sprites.other['official-artwork'].front_default`
- Nombre y ID
- Tipos: `pokemon.types`
- Estadisticas: `pokemon.stats`
- Habilidades: `pokemon.abilities`

### Paso 4: Paginacion

Crea `Pagination.jsx`:
- Usa un estado `page` para controlar la pagina actual
- Calcula `offset = (page - 1) * limit`
- Botones Anterior/Siguiente que cambien el `page`
- Deshabilita Anterior en pagina 1
- Deshabilita Siguiente si no hay mas resultados

### Paso 5: Favoritos con localStorage

```javascript
// Guardar
localStorage.setItem('favorites', JSON.stringify([1, 25, 150]));

// Leer
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Eliminar
const nuevos = favorites.filter(id => id !== pokemonId);
localStorage.setItem('favorites', JSON.stringify(nuevos));
```

### Paso 6: Registro y Login

**Registro:**
```javascript
const users = JSON.parse(localStorage.getItem('users')) || [];
users.push({ email, password });
localStorage.setItem('users', JSON.stringify(users));
```

**Login:**
```javascript
const users = JSON.parse(localStorage.getItem('users')) || [];
const user = users.find(u => u.email === email && u.password === password);
```

---

## Estructura de Archivos Sugerida

```
src/
├── components/
│   ├── PokemonCard.jsx      # Tarjeta de cada Pokemon
│   ├── PokemonList.jsx      # Lista principal
│   ├── PokemonDetail.jsx    # Detalle ampliado
│   ├── Pagination.jsx       # Navegacion paginas
│   ├── Favorites.jsx        # Lista de favoritos
│   ├── Login.jsx            # Formulario login
│   ├── Register.jsx         # Formulario registro
│   └── Navbar.jsx           # Barra de navegacion
├── services/
│   └── pokeapi.js           # Conexion con la API
├── utils/
│   └── localStorage.js      # Helpers para localStorage
├── context/
│   └── AuthContext.jsx      # Estado de autenticacion
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## Consejos

1. **Caché local**: Guarda las respuestas de la API en localStorage para no repetir peticiones
2. **Imagenes**: Usa `sprites.other['official-artwork'].front_default` para imagenes de alta calidad
3. **Errores**: Siempre maneja errores en las peticiones fetch con try/catch
4. **Loading**: Muestra un indicador de carga mientras obtienes datos
5. **Nombres**: Los nombres de los Pokemon estan en minusculas en la API

---

## Recursos

- [Documentacion PokéAPI](https://pokeapi.co/docs/v2)
- [PokéAPI GitHub](https://github.com/PokeAPI/pokeapi)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)

---

## Ejercicios Sugeridos

1. Agrega un filtro por tipo de Pokemon
2. Implementa busqueda por nombre en tiempo real
3. Crea animaciones al pasar el mouse sobre las tarjetas
4. Agrega un modo oscuro
5. Muestra la cadena de evolucion del Pokemon
6. Compara estadisticas de dos Pokemon

---

¡Buena suerte! Recuerda que lo mas importante es practicar y divertirse programando.
