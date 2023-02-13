const {Router} = require("express");
const {Recipe, TypeDiet} = require("../db");

const router = Router();

router.post("/", async(req, res) => {
    let{ name, summary, healthscore, steps, diets, image, dishtypes} = req.body 
    try{
        const recipeCreated = await Recipe.create({
            name, 
            summary, 
            healthscore, 
            steps,
            image: image?image:'https://media.istockphoto.com/id/471854619/it/foto/sfondo-per-ricette.jpg?s=612x612&w=0&k=20&c=5gZC7UDgQ8SQGNwyhit-HKLDGRPciTbHIuRp_5ylUmY=',
            dishtypes,
        });
        const typediet = await TypeDiet.findAll({
            where: {name: diets}
        });
        await recipeCreated.addTypeDiet(typediet)
        res.status(200).send(recipeCreated)
    } catch (error) {
        res.status(404).send(error)
    }
});

module.exports = router; 

	// "name": "hola",
	// "summary": "esto es nuevo",
	// "healtscore": "3.0",
	// "steps": "4",
	// "image": "https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/master/pass/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg",
	// "dishtypes": "cosas",
	// "diets": "vegan"