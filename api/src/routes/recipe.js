const express = require('express');
const router = express.Router();
require('dotenv').config();
const { Recipe, Diet, Op } = require('../db');

router.post('/', async (req, res, next) => {
  try {
    let {
      name,
      dish_summary,
      image,
      Healthy_food_level,
      Step_by_step,
      score,
      diets,
    } = req.body;

    let recipeCreate = await Recipe.create({
      name,
      dish_summary,
      image,
      Healthy_food_level,
      Step_by_step,
      score,
    });
    console.log(Diet);
    let dietTypesRecipeDb = await Diet.findAll({
      where: { name: diets },
    });
    await recipeCreate.addDiet(dietTypesRecipeDb);
    console.log(dietTypesRecipeDb);
    res.send('recipeCreate');
    if (!name)
      return res
        .status(400)
        .send({ error: 'Debe ingresar el name para la receta' });
    if (!dish_summary)
      return res
        .status(400)
        .send({ error: 'Debe ingresar un summary del receta' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// const express = require('express')
// const router = express.Router()
// require('dotenv').config();
// const { Recipe, Diet, Op } = require('../db');

// router.post('/', async (req, res) => {
//   try{ let{  name,
//         dish_summary,
//         image,
//         Healthy_food_level,
//         Step_by_step,
//         score,
//     diets} = req.body

//         let recipeCreate = await Recipe.create({
//             name,
//             dish_summary,
//             image,
//             Healthy_food_level,
//             Step_by_step,
//             score,
//         })

//         let dietDB = await Diet.findAll({
//             where: {name: diets}
//         })

//         if (!name) return res.status(400).send({error: 'Debe ingresar el name para la receta'});
//         if (!summary) return res.status(400).send({error: 'Debe ingresar un summary del receta'});
//         // console.log(recipeCreate);
//         // console.log(dietDB);

//         recipeCreate.addDiet(dietDB);
//         res.send('Succesfull');

//     }catch(error){
//         res.status(400).send(error);
//     }
// })

module.exports = router;
