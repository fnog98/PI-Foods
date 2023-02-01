import axios from "axios";

export function getRecipe(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes", {});
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
};

export function filterByDiets(payload){
    return({
        type: 'FILTER_BY_DIETS',
        payload
    })
};

export function orderByName(payload){
    return({
        type: 'SORT_BY_NAME',
        payload
    })
};

export function orderByHS(payload){
    return({
        type: 'SORT_BY_HS',
        payload
    })
};

export function getNameRecipe(payload){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipes?name=' + payload)
            return dispatch({
                type: 'GET_NAME_RECIPE',
                payload: json.data
            })
        } catch (error) {
            alert('RICETTA NON TROVATA')
        }
    }
};

export function getDiets(){
    return async function (dispatch){
        var json = await axios.get('http://localhost:3001/diets', {});
        return dispatch({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
};

export function getRecipeByID(id){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${id}`, {});
        return dispatch({
            type: 'GET_RECIPE_BY_ID',
            payload: json.data
        })
    }
};

export function postRecipes(payload){
    return async function(dispatch){
        var json = await axios.post('http://localhost:3001/recipes', payload);
        return json
    }
};

export function Loading(){
    return{
        type: 'LOADER'
    }
};