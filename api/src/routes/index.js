const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipe = require('./recipe.js');
const recipes = require('./recipes.js');
const diet = require('./diets.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/types', typesRouter);

router.use('/recipe', recipe); //crear recetas
router.use('/types', diet); //todas las recetas
router.use('/recipes', recipes); //recetas creadas

module.exports = router;
