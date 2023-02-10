import React from "react";
import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {getDiets, postRecipes} from '../../actions';
import { useDispatch, useSelector } from "react-redux";

function validate(input){
    let errors={};
    if(!input.name){
        errors.name='Nombre requerido';
    } if(!input.summary){
        errors.summary='Resumen requerido';
    } if(input.healthscore > 100 || input.healthscore < 0){
        errors.healthscore = 'El Healt Score debe ser entre 0 y 100';
    }
    return errors;
};

function RecipeCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector(state => state.diets)

    const [dataSteps, setDataSteps] = useState('')
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        summary: '',
        image: '',
        healthscore: '',
        dishtypes: '',
        steps: [],
        diets: []
    })

    useEffect(()=>{
        dispatch(getDiets())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        if(input.name === ''){
            return alert('Ingresar Plato')
        }
        if(input.summary === ''){
            return alert('Resumen del plato')
        }
        if(input.image === ' '){
            setInput({
                ...input,
                image: 'https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_640.png'
            })
        }
        if(input.healthscore > 100 || input.healthscore < 0){
            return alert('Healthscore entre 0 y 100')
        }

        dispatch(postRecipes(input))
        alert('Receta Creada con Exito')
        setInput({
            name: '',
            summary: '',
            image: '',
            healthscore: '',
            dishtypes: [],
            steps: [],
            diets: [],
        })
        history.push('/home')
    };

    function handlerCheckbox(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        } else{
            setInput({
                ...input, 
                diets: input.diets.map(r => r !== e.target.value)
            })
        }
    };
    
    function handlerAddSteps(e){
        e.preventDefault();
        setInput({
            ...input,
            steps: [...input.steps, dataSteps]
        })
    
        setDataSteps('')
    };

    function handlerDeleteLast(e){
        e.preventDefault();
        input.steps.pop();
        setInput({
            ...input,
        })
        setDataSteps('')
    };

    function handlerDeleteAll(e){
        e.preventDefault();
        setInput({
            ...input,
            steps: []
        })
        setDataSteps('')
    };

    return(
        <div className='mainContainer'>
            <div className='backButton'>
                <Link to='/home'><button>Volver</button></Link>
            </div>

            <form onSubmit={e => handleSubmit(e)}>
                <section className='inputsycheck'>
                    <div className='inputsText'>
                        <div>
                            <label>Nombre: </label>
                            <input type='text' className="inputData" value={input.name} name="name" onChange={handleChange}/>
                        </div>
                        {errors.name &&(<p className ="error">{errors.name}</p>)}
                        {/* <div>
                            <label>Imagen:</label>
                            <input type='text' value={input.image} name='image' className='inputData' onChange={handleChange}></input>
                        </div> 
                        */}
                        <div>
                            <label>Resumen: </label>
                            <textarea className="inputData" value={input.summary} name="summary" rows='5' cols="35" onChange={handleChange}/>    
                        </div>    
                        <div>
                            <label>Tipo de plato: </label>
                            <input type='text' className="inputData" value={input.dishtypes} name="dishtypes" onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Health Score: </label>
                            <input name='healthscore' className="inputData" type="number" value={input.healthscore} onChange={handleChange}></input>
                        </div>
                        {errors.healthscore &&(<p className="error">{errors.healthscore}</p>)}
                    </div>
                    <div className="containerCheck">
                        <fieldset className="orgContCheck">
                            <legend>Elegir dietas</legend>
                            {diets.map((e, i)=>{
                                return(
                                    <div className="organizadorCheck">
                                        <p className="textCheck" key={i}>
                                            {e.name}
                                        </p>
                                        <input className="checkDietas" type="checkBox" name={e.name} value={e.name} onChange={e=>handlerCheckbox(e)}></input>
                                    </div>
                                )
                            })}
                        </fieldset>
                    </div>
                </section>
                <section className="stepyrender">
                    <div className="stepByStep">
                            <legend>Pasos: </legend>
                            <textarea value={dataSteps} name="name" onChange={e=>setDataSteps(e.target.value)} row="8" col="80"></textarea> 
                            <div>
                                <input type="submit" name="agregar" value="Agregar paso" onClick={e=>handlerAddSteps(e)}></input>
                                <input type="submit" name="borrar" value="Borrar ultimo" onClick={e=>handlerDeleteLast(e)}></input>
                                <input type="submit" name="borrartodo" value="Borrar Todo" onClick={e=>handlerDeleteAll(e)}></input>
                            </div>
                    </div>
                    <div className="renderStepByStep">
                            <ol>
                                {
                                    input.steps.map((e, i)=>{
                                        return(
                                        <>
                                            <li key={i}>{e}</li>
                                        </>)
                                    })
                                }
                            </ol>
                    </div>
                </section>
                <div className="mandaReceta">
                    <button type="submit">Crear Receta</button>
                </div>
            </form>
        </div>
    )
}

export default RecipeCreate;