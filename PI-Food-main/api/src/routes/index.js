const { Router } = require('express');
// Importar todos los routers;
const recipeRouter = require('./RecipeRouter.js');
const dietRouter = require('./DietRouter.js');


const router = Router();

// Configurar los routers
router.use('/recipes', recipeRouter);
router.use('/diets', dietRouter);


module.exports = router;
