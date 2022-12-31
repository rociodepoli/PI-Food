require("dotenv").config();
const {Recipe, Diet}= require('../db');
const {API_KEY} = process.env;
const axios = require('axios');

const getRecipesDb= async ()=>{
try {
    const recipes= await Recipe.findAll({ 
        include: {
model: Diet,
attributes: ['name'],
through:{
    attributes:[]
}
    }});
    return recipes.map(r=>{
        return{
            name: r.name,
            id: r.id,           
            summary: r.summary,
            healthScore: r.healthScore,
            diets: r.diets.map(d=> d.name),
            steps: r.steps
        }
    })
} catch (error) {
    return error
}
}

const getRecipesApi=async()=>{
try {
    const api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`, { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    })
    //console.log(api)
    const apiinfo= api.data?.results
    //console.log(apiinfo)
    return apiinfo.map(r=>{
        return{
        name: r.title,
        id: r.id,
        summary: r.summary,
        healthScore: r.healthScore,
        diets: r.diets,
        steps: r.analyzedInstructions[0] ? r.analyzedInstructions[0].steps.map(s=> s.step).join(" ") : ''  
        }
    })
} catch (error) {
    return error
}
}

const getAllInfo= async()=>{
try {
    const api= await getRecipesApi();
    const db= await getRecipesDb();
     return [...api, ...db]
} catch (error) {
    return error
}
}

module.exports= {getAllInfo, getRecipesApi, getRecipesDb}