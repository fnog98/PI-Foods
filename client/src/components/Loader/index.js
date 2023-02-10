import React from 'react';

const curiosidad = [
    'Fideos china',
    'Almendras torino',
    'zanahorias de colores',
    'pizza marge',
];

export default  function Loadre(){
    return (
        <div>
            <div>
                <h1>Caricando</h1>
                <span></span>
                <div>
                    <h2>Sapevi che?...</h2>
                    <h3>{curiosidad[Math.floor((Math.random() * curiosidad.length))]}</h3>
                </div>
            </div>
        </div>
    )
};