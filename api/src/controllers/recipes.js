require('dotenv').config();
const axios = require('axios');
const {Recipe, TypeDiet} = require('../db');
const {API_KEY} = process.env;

const getApiInfo = async () => {
    try {
        const apiUrl= await axios({
            method: 'get',
            url: "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5",
            // url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`,
            headers: {"Accept-Enconding": "null"}
        })

        const apiInfo = await apiUrl.data.results?.map((e)=>{
            return{
                id: e.id,
                name: e.title,
                summary: e.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ""),
                healthscore: e.healthScore,
                image: e.image,
                diets: e.diets,
                dishtypes: e.dishTypes,
                steps: e.analyzedInstructions[0]?.steps.map(e => {
                    return (e.step)
                })
            }
        })
        return apiInfo;
    } catch(error){return error}
};

const getDBinfo = async() => {
    try {
        const recipes = await Recipe.findAll({
            include: {
                model: TypeDiet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return await recipes.map(e=>{
            return{
                id: e.id,
                name: e.name,
                summary: e.summary,
                healthscore: e.healthscore,
                image: e.image,
                steps: e.steps,
                dishtypes: e.dishtypes,
                diets: e.TypeDiets.map(e=>e.name)
            }
        })
    } catch (error){
        return res.status(404).send(error)
    }
};

const getALLRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDBinfo()
    console.log(apiInfo)
    const allInfo = dbInfo.concat(apiInfo);
    return allInfo;
};

module.exports = {
    getApiInfo, 
    getDBinfo, 
    getALLRecipes
};
