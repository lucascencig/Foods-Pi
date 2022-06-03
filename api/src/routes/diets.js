const express = require('express');
const router = express.Router();
const { Recipe, Diet } = require('../db');
const dietTypesDb = [
  'gluten free',
  'ketogenic',
  'vegetarian',
  'lacto vegetarian',
  'ovo vegetarian',
  'lacto ovo vegetarian',
  'vegan',
  'pescatarian',
  'paleolithic',
  'primal',
  'low fodmap',
  'whole 30',
  'dairy free',
];

router.get('/', async (req, res, next) => {
  try {
    dietTypesDb.forEach(e => {
      Diet.findOrCreate({
        where: { name: e },
      });
    });
    const dietTypes = await Diet.findAll();
    res.send(dietTypes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
// const express = require('express')
// const router = express.Router()
// const { Diet } = require('../db');

// router.get('/', async (req, res) => {
//     try{
//         let typesDiet = await Diet.findAll();
//         // console.log(typesDiet);
//         res.status(200).json(typesDiet);
//     } catch (error){
//         res.status(400).send(error);
//     }
// })

// module.exports = router
