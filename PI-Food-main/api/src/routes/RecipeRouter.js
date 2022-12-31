const {Router}= require('express');
const {getRecipesParams, getRecipesQuery, postRecipe}= require('../Controllers/RecipeController.js')
const {validateQuery, validatePost, validateParams}= require('../Controllers/middlewares.js')

const router= Router();

router.get('/',getRecipesQuery);

router.get('/:id',getRecipesParams);

router.post('/', validatePost, postRecipe);

module.exports= router;