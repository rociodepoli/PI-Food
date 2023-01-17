const {Diet}= require('../db');



const getDiets= async()=>{
try {
    const prediets= await Diet.findAll();
    if(prediets.length>0) return prediets;
   const diets= [
    'ketogenic',
    'dairy free',
    'lacto ovo vegetarian',
    'vegan',
    'pescatarian',
    'paleolithic',
    'primal',
    'fodmap friendly',
    'whole 30',
    'gluten free'
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