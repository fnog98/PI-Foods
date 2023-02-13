import React from 'react';
import './loader.css';

const curiosidad = [
    'Fideos china',
    'Almendras torino',
    'zanahorias de colores',
    'pizza marge',
];

export default  function Loader(){
    return (
        <div className="loaderContainer">
            <div className="contentLoader">
                <h1>Cargando</h1>
                <span className="loader"></span>
                <div className="sabias">
                    <h2>Sapevi che?...</h2>
                    <h3>{curiosidad[Math.floor((Math.random() * curiosidad.length))]}</h3>
                </div>
            </div>
        </div>
    )
};