//acá se va a importar el modelo Recipe
require("dotenv").config();
const {Recipe, Diet}= require('../db');
const {API_KEY} = process.env;
const axios = require('axios');

const getIdApi= async(id) =>{
 try {
    console.log(API_KEY)
    const apidata = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,{ 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    });
    const api= apidata.data
    console.log(api)
    return {
         id,
         name: api.title,
         summary:api.summary,
         healthScore:api.healthScore,
         image: api.image,
         steps: api.instructions,
         diets: api.diets
    }
    
 } catch (error) {
      return `ID NO EXISTENTE: ${error}`
 }
}

const getIdDb= async (id) =>{
    try {
        const dbinfo= await Recipe.findByPk(id,  {include: {
            model: Diet,
            attributes: ["name"],
            through: { attributes: [] },
          }})
        const info={
            id,
            name: dbinfo.name,
            summary: dbinfo.summary,
            healthScore: dbinfo.healthScore || 'no info about Health Score',
            image: dbinfo.image,
            steps: dbinfo.steps || 'no info about instructions',
            diets: dbinfo.diets.map(d=> d.name)
        }
        return info
    } catch (error) {
        return `ID NO EXISTENTE: ${error}`
    }
}

const getId= async (id) => {
    try {
        if(id.includes('-')) {
            const dbid= await getIdDb(id);
            return dbid
        }
        else{
            const apid= await getIdApi(id);
            return apid
        }

    } catch (error) {
        return error
    }
}
module.exports={getId}