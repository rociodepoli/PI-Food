const getDietss= require('../helpers/getDiets.js')

const getDiets=async (req, res)=>{
    try {
        res.status(200).json(await getDietss())
    } catch (error) {
    res.status(400).json({error: error})    
    }
    
}

module.exports= getDiets