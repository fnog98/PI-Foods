import React from 'react';
import './loader.css';

const curiosidad = [
    'Los fideos se inventaron en china',
    'Nutella se descubrio en Italia',
    'Las Zanahorias fueron modificadas para ser naranjas',
    'La pizza Margherita en argentina la llaman Napolitana',
    'El zapallito verde o de tronco es originario de sudamerica',
    '8 de los 10 mejores quesos del mundo son Italianos',
    'Los productos provenientes de animales'


];

export default  function Loader(){
    return (
        <div className="loaderContainer">
            <div className="contentLoader">
                <h1>Cargando</h1>
                <span className="loader"></span>
                <div className="sabias">
                    <h2>Sabias que...?</h2>
                    <h3>{curiosidad[Math.floor((Math.random() * curiosidad.length))]}</h3>
                </div>
            </div>
        </div>
    )
};