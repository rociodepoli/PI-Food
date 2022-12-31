const {getId} =require('../helpers/getRecipeId.js');
const { getAllInfo}= require('../helpers/getRecipeQuery.js')
const postRecipee= require('../helpers/postRecipe.js')

const getRecipesParams= async (req, res)=>{
    const {id} = req.params;
    try {
        return res.status(200).json(await getId(id))
    } catch (error) {
        return res.status(400).json({error: error})
    }
   
}

const getRecipesQuery= async (req, res)=>{
    const {name} = req.query;
   try {
    if(name) {
        const allinfo= await getAllInfo();
        const names= allinfo.filter(r=> r.name.toLowerCase().includes(name.toLowerCase()));
        res.status(200).json(names)
    }
    else{
        res.status(200).json(await getAllInfo())
    }
    } catch (error) {
    res.status(400).json({error: error})
   }
}

const postRecipe= async (req, res)=>{
    const{name, summary, healthScore,image, diets, steps} = req.body;
    try {
        return res.status(200).json(await postRecipee(name, image, summary, healthScore, steps, diets))
    } catch (error) {
        return res.status(400).json({error: error})
    }
    
}


module.exports= {getRecipesParams, getRecipesQuery, postRecipe}