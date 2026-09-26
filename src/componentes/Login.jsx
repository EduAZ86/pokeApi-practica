import React from "react";
import { useState } from "react";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarRegistro = () => {
    if (!email || !password) {
      alert("Por favor, debe completar ambos campos");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(u => u.email === email)) {
      alert("Este usuario ya está registrado");
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("el usuario fue registrado con exito");
  };

  const manejarLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert("el ingreso fue exitoso");
      onLoginSuccess(email); 
    } else {
      alert("Usuario incorrecto");
    }
  };

  return (
    <div className="contenedor login" style={{marginTop:'-10px'}}>
      <h4>Acceso Pokédex</h4>
      
      <input 
        type="email" 
        placeholder="Usuario / Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input 
        type="password" 
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="login-botones">
        <button onClick={manejarLogin}>Ingresar</button>
        <button onClick={manejarRegistro}>Registrarse</button>
      </div>
    </div>
  );
}

export default Login;