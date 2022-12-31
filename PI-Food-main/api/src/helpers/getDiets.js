const {Diet}= require('../db');



const getDiets= async()=>{
try {
    const prediets= await Diet.findAll();
    if(prediets.length>0) return prediets;
   const diets= [
    'Ketogenic',
    'Vegetarian',
    'Lacto-Vegetarian',
    'Ovo-Vegetarian',
    'Vegan',
    'Pescetarian',
    'Paleo',
    'Primal',
    'Low FODMAP',
    'Whole30',
    'Gluten Free'
   ]
   diets.map(async d=> await Diet.findOrCreate({where: {name:d}}))
   const finddiets= await Diet.findAll()
   //console.log(finddiets)
   return finddiets
} catch (error) {
    return error
}
}

module.exports=getDiets