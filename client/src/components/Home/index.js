import React from "react";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterByDiets, getDiets, orderByName, orderByHS, Loading } from "../../actions";
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import Card from '../Card';
import Paginado from '../Paginado';
import SearchBar from "../SearchBar";
import "../Home/home.css";

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.recipes);
    const diets = useSelector(state => state.diets);
    // const loader = useSelector(state => state.loader);

    const [currentPage, setCurrentPage] = useState(1);
    const [orden, setOrden] = useState('');

    const recipesPerPage = 9;
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(()=>{
        dispatch(getRecipes());
        dispatch(getDiets());
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(Loading());
        setCurrentPage(1);
        dispatch(getRecipes());
        dispatch(Loading());
    };

    async function handleFilterDiets(e){
        e.preventDefault();
        dispatch(Loading());
        await dispatch(getRecipes());
        dispatch(filterByDiets(e.target.value))
        dispatch(Loading());
        setCurrentPage(1);
    };

    function handleSortName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleSortHS(e){
        e.preventDefault();
        dispatch(orderByHS(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
    };

    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        dispatch(Loading());
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        }, 2000);
        dispatch(Loading());
    }, [dispatch])

    return(
        loading ? (<Loader/>) :
        (
                            <div className="main">
                                <div className="buttonCrear">
                                    <Link to='/createrecipe'><button>Crear Receta</button></Link>
                                    <button className='buttonrecet' onClick={(e)=>{handleClick(e)}}>
                                        Restablecer
                                    </button>
                                </div>
                                <div>
                                    <SearchBar paginado={paginado}/>
                                </div>
                                <div className="filterSelects"> 
                                    <select onChange={e=>handleSortName(e)}>
                                        <option selected disabled>Orden Alfabetico</option>
                                        <option value='asc'>A-Z</option>
                                        <option value='desc'>Z-A</option>
                                    </select>
                                        <select onChange={e=>handleFilterDiets(e)}>
                                        <option selected disabled>Dietas</option>
                                        {diets?.map(e=>{
                                            return(<option value={e.name} key={e.id}>{e.name}</option>)})
                                        }
                                        </select>
                                    <select onChange={e=> handleSortHS(e)}>
                                        <option selected disabled>HealtScore</option>
                                        <option value='hasc'>Bajo-Alto</option>
                                        <option value='hdesc'>Alto-Bajo</option>
                                    </select>
                                </div>
                                <Paginado 
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                    recipesPerPage={recipesPerPage}
                                    allRecipes={allRecipes.length}
                                    paginado={paginado}
                                />
                                <div className="cards">
                                    {currentRecipes?.map((e)=>{
                                        return(
                                            <Card 
                                            id={e.id} 
                                            name={e.name} 
                                            image={e.image} 
                                            diets={e.diets} 
                                            key={e.id}
                                            healthscore={e.healthscore}
                                            />
                                        )
                                    })}
                                </div>
                                <Paginado 
                                    currentPage={currentPage}
                                    recipesPerPage={recipesPerPage}
                                    allRecipes={allRecipes.length}
                                    paginado={paginado}
                                />
                            </div>
        )
    );


//     if(getRecipes && getDiets){
//         return(
//             <div className="main">
//                 <div className="buttonCrear">
//                     <Link to='/createrecipe'><button>Crear Receta</button></Link>
//                     <button className='buttonrecet' onClick={(e)=>{handleClick(e)}}>
//                         Restablecer
//                     </button>
//                 </div>
//                 <div>
//                     <SearchBar paginado={paginado}/>
//                 </div>
//                 <div className="filterSelects"> 
//                     <select onChange={e=>handleSortName(e)}>
//                         <option selected disabled>Orden Alfabetico</option>
//                         <option value='asc'>A-Z</option>
//                         <option value='desc'>Z-A</option>
//                     </select>
//                         <select onChange={e=>handleFilterDiets(e)}>
//                         <option selected disabled>Dietas</option>
//                         {diets?.map(e=>{
//                             return(<option value={e.name} key={e.id}>{e.name}</option>)})
//                         }
//                         </select>
//                     <select onChange={e=> handleSortHS(e)}>
//                         <option selected disabled>HealtScore</option>
//                         <option value='hasc'>Bajo-Alto</option>
//                         <option value='hdesc'>Alto-Bajo</option>
//                     </select>
//                 </div>
//                 <Paginado 
//                     setCurrentPage={setCurrentPage}
//                     currentPage={currentPage}
//                     recipesPerPage={recipesPerPage}
//                     allRecipes={allRecipes.length}
//                     paginado={paginado}
//                 />
//                 <div className="cards">
//                     {currentRecipes?.map((e)=>{
//                         return(
//                             <Card 
//                             id={e.id} 
//                             name={e.name} 
//                             image={e.image} 
//                             diets={e.diets} 
//                             key={e.id}
//                             healthscore={e.healthscore}
//                             />
//                         )
//                     })}
//                 </div>
//                 <Paginado 
//                     currentPage={currentPage}
//                     recipesPerPage={recipesPerPage}
//                     allRecipes={allRecipes.length}
//                     paginado={paginado}
//                 />
//             </div>
//         )
//     } else {
//         return (
//             <Loader/>
//         )
//     };
}