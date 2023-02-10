import React from 'react';

function Paginado({recipesPerPage, allRecipes, paginado, currentPage}){
    const pageNumbers = [];
    
    for(let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++){
        pageNumbers.push(i+1)
    }
    
    if(currentPage === pageNumbers.length + 1){
        paginado(1)
    }
    return(
        <div>
            <button onClick={() => paginado(currentPage === 1 ? pageNumbers.length : currentPage - 1)}> 🢀 </button>
            {pageNumbers && 
            pageNumbers.map(number => {
                return(<button className={`numberpage ${number === currentPage? 'paginaactiva':null}`}key={number} onClick={() => paginado(number)}>{currentPage === number ? <b>{number}</b> : number}</button>)
            })}
            <button onClick={() => paginado(currentPage === 0 ? pageNumbers.length : currentPage + 1)}> 🢂 </button>
        </div>
    )
};

export default Paginado;