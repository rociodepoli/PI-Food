const {Router}= require('express');
const getDiets= require('../Controllers/DietController.js')

const router= Router();

router.get('/', getDiets)

module.exports= router;