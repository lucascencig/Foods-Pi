const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const { Recipe, Diet, Op } = require('../db');
const { YOUR_APY_KEY, URLFOOD } = process.env;

const infoapi = async () => {
  try {
    const url = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch?apiKey=d5f3a28b6ee24ddaaafa075e5837500a&addRecipeInformation=true&number=100'
      // `${URLFOOD}/recipes/complexSearch?apiKey=${YOUR_APY_KEY}&addRecipeInformation=true&number=100`
    );
    // YOUR_APY_KEY00=8cb1910af67d42e9a53689c91fb47224
    // 'https://api.spoonacular.com/recipes/complexSearch?apiKey=a675acac718c4bfc989cb8399efe9578&addRecipeInformation=true&number=100'
    const info = await url.data.results.map(c => {
      return {
        name: c.title,
        image: c.image,
        idApi: c.id,
        score: c.spoonacularScore,
        healthScore: c.healthScore,
        types: c.dishTypes?.map(element => element),
        diets: c.diets?.map(element => element),
        summary: c.summary,
        steps:
          c.analyzedInstructions[0] && c.analyzedInstructions[0].steps
            ? c.analyzedInstructions[0].steps
                .map(item => item.step)
                .join('*Siguiente Paso:')
            : '',
      };
    });

    // console.log(info)
    return info;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const apiname = async name => {
  try {
    const url = await axios.get(
      `${URLFOOD}/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=10&apiKey=${YOUR_APY_KEY}`
    );
    console.log(url.data);
    const { results } = url.data;
    if (results.length > 0) {
      let info = results?.map(result => {
        return {
          name: result.title,
          image: result.image,
          idApi: result.id,
          score: result.spoonacularScore,
          healthScore: result.healthScore,
          types: result.dishTypes?.map(element => element),
          diets: result.diets?.map(element => element),
          summary: result.summary,
          steps:
            result.analyzedInstructions[0] &&
            result.analyzedInstructions[0].steps
              ? result.analyzedInstructions[0].steps
                  .map(item => item.step)
                  .join(' \n')
              : '',
        };
      });
      return info;
    } else {
      return 'error';
    }
  } catch (error) {
    console.error(error);
    return 'error, sin coinicidencias';
  }
};

const infodb = async () => {
  try {
    const datadb = await Recipe.findAll({
      include: {
        model: Diet,
        atributes: ['name'],
        through: { attributes: [] },
      },
    });
    console.log(datadb);
    let res = await datadb?.map(recipe => {
      return {
        id: recipe.Id,
        name: recipe.name,
        summary: recipe.dish_summary,
        score: recipe.score,
        healthScore: recipe.Healthy_food_level,
        image: recipe.image,
        steps: recipe.Step_by_step,
        diets: recipe.Diets?.map(diet => diet.name),
      };
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

const infodbyapi = async () => {
  try {
    const infoDb = await infodb();
    const infoApi = await infoapi();
    const infogral = infoApi.concat(infoDb);
    return infogral;
  } catch (e) {
    return 'error';
  }
};

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  try {
    if (name) {
      const infoByName = await apiname(name);
      const dataDB = await Recipe.findOne({
        where: { name },
        include: {
          model: Diet,
          atributes: ['name'],
          through: {
            attributes: [],
          },
        },
      });
      // console.log(dataDB)
      if (
        dataDB &&
        infoByName !== 'error, sin coinicidencias' &&
        infoByName !== 'error'
      ) {
        const obj = {
          id: dataDB.Id,
          name: dataDB.name,
          summary: dataDB.dish_summary,
          score: dataDB.score,
          healthScore: dataDB.Healthy_food_level,
          image: dataDB.image,
          steps: dataDB.Step_by_step,
          diets: dataDB.Diets?.map(diet => diet.name),
        };
        return res.status(200).send([obj, ...infoByName]);
      } else if (dataDB) {
        const obj = {
          id: dataDB.Id,
          name: dataDB.name,
          summary: dataDB.dish_summary,
          score: dataDB.score,
          healthScore: dataDB.Healthy_food_level,
          image: dataDB.image,
          steps: dataDB.Step_by_step,
          diets: dataDB.Diets?.map(diet => diet.name),
        };
        return res.json(obj);
      } else if (
        infoByName !== 'error, sin coinicidencias' &&
        infoByName !== 'error'
      ) {
        return res.json(infoByName);
      } else {
        let objerr = {
          name: 'Not Found',
          image:
            'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',
          id: 0,
          score: 0,
          healthScore: 0,
          diets: [],
          summary: 'Not Found',
          steps: 'Not Found',
        };
        return res.json([objerr]);
      }
    } else {
      const allDate = await infodbyapi();
      if (allDate.length > 0) {
        return res.json(allDate);
      } else {
        {
          let objerr = {
            name: 'Not Found',
            image:
              'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',
            id: 0,
            score: 0,
            healthScore: 0,
            diets: [],
            summary: 'Not Found',
            steps: 'Not Found',
          };

          res.json([objerr]);
        }
      }
    }
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id.length < 8) {
      const resAxios = await axios.get(
        `${URLFOOD}/recipes/${id}/information?apiKey=${YOUR_APY_KEY}&addRecipeInformation=true&number=100`
      );
      const datefilter = resAxios.data;
      let idfilter = {
        name: datefilter.title,
        image: datefilter.image,
        idApi: datefilter.id,
        score: datefilter.spoonacularScore,
        healthScore: datefilter.healthScore,
        diets: datefilter.diets?.map(element => element),
        types: datefilter.dishTypes?.map(element => element),
        summary: datefilter.summary,
        steps:
          datefilter.analyzedInstructions[0] &&
          datefilter.analyzedInstructions[0].steps
            ? datefilter.analyzedInstructions[0].steps
                .map(item => item.step)
                .join(' \n')
            : '',
      };

      return res.json(idfilter);
    }
    const dataDB = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        atributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
    if (dataDB) {
      const obj = {
        id: dataDB.Id,
        name: dataDB.name,
        summary: dataDB.dish_summary,
        score: dataDB.score,
        healthScore: dataDB.Healthy_food_level,
        image: dataDB.image,
        steps: dataDB.Step_by_step,
        diets: dataDB.Diets?.map(diet => diet.name),
      };
      return res.json(obj);
    } else {
      throw new TypeError('sin coincidencias');
    }
  } catch (e) {
    let objerr = {
      name: 'Not Found',
      image:
        'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',
      score: 0,
      healthScore: 0,
      diets: [],
      summary: 'Not Found',
      steps: 'Not Found',
    };

    res.json(objerr);
  }
});

module.exports = router;
