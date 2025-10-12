import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// TODO #1
// D'on venen els mètodes createRoot i render de les línies següents?
//Del paquet react-dom/client, que serveix perquè React pugui mostrar coses al navegador.

// D'on ve l'element amb identificador root?
//Del fitxer index.html, on hi ha un <div id="root"></div>.

// Què fa el mètode render?
//Mostra el component <App /> dins del div amb id root.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
