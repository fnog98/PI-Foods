import React from "react";
import {Link} from 'react-router-dom';

export default function Card ({image, name, diets, id, healthscore}){
    return(
        <div>
            <Link to={`/home/${id}`}>
                <img src={image} alt='img not found'/>
            </Link>
            <div>
                <h3>{name}</h3>
                <h5>TIPO DE DIETA: {diets.join(', ')}</h5>
                <h5>HEALTH SCORE: {healthscore}</h5>
            </div>
        </div>
    )
};