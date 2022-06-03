import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTypes, postRecipes } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import S from '../styles/RecipeCreate.module.css';

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  const type = useSelector(state => state.types);
  const [error, setError] = useState('');

  function validarInputName(evt) {
    if (/\d/.test(evt.target.value)) {
      setError('No es un Nombre');
    } else {
      setError('');
    }
    handleChange(evt);
  }

  function validarInputDish(evt) {
    if (/\d/.test(evt.target.value) && evt.target.value > 20) {
      setError('No es un Texto');
    } else {
      setError('');
    }
    handleChange(evt);
  }

  function validarInputStep(evt) {
    if (/\d/.test(evt.target.value) && evt.target.value > 20) {
      setError('No es un Texto1');
    } else {
      setError('');
    }
    handleChange(evt);
  }

  function validarInputNum(evt) {
    if (/\d/.test(evt.target.value)) {
      setError('Los datos no son Numeros');
    } else {
      setError('');
    }
    handleChange(evt);
  }

  function validarInputNum1(evt) {
    if (/\d/.test(evt.target.value)) {
      setError('Los datos no son Numeros1');
    } else {
      setError('');
    }
    handleChange(evt);
  }

  function validarInputUrl(evt) {
    if (
      !/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/.test(
        evt.target.value
      ) &&
      !/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(evt.target.value)
    ) {
      setError('Los datos ingresados NO SON URL VALIDOS');
    } else {
      setError('');
    }
    handleChange(evt);
  }

  const [input, setInput] = useState({
    name: '',
    dish_summary: '',
    score: '',
    Healthy_food_level: '',
    Step_by_Step: '',
    image: '',
    diets: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  async function handleSubmit(evt) {
    setInput({
      name: '',
      dish_summary: '',
      score: '',
      Healthy_food_level: '',
      Step_by_Step: '',
      image: '',
      diets: [],
    });
    console.log(input.diets);
    if (
      input.name &&
      !/\d/.test(input.name) &&
      input.diets.length > 0 &&
      input.Healthy_food_level <= 100 &&
      input.dish_summary.length > 0
    ) {
      evt.preventDefault();
      dispatch(postRecipes(input));

      return alert('¡Receta creada con exito!');
      console.log(input);
    }
    alert('¡Debe llenar todos los campos para poder crear la receta!');
  }

  async function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(evt) {
    if (!input.diets.includes(evt.target.value)) {
      setInput({
        ...input,
        diets: [...input.diets, evt.target.value],
      });
    }
  }

  function handleDelete(evt) {
    setInput({
      ...input,
      diets: input.diets.filter(diet => diet !== evt),
    });
  }

  return (
    <div className={S.contenedorForm}>
      <Link to={'/home'}>
        <button>Volver</button>
      </Link>

      <h2>¡Crea tu propia receta!</h2>

      <form className={S.form} onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          onChange={validarInputName}
          value={input.name}
          name="name"
        />
        <div className={S.span}>
          {error !== '¡No es un Nombre!' ? null : (
            <span>Debe ingresar un nombre para la receta.</span>
          )}
        </div>
        <label>Summary:</label>
        <textarea
          className={S.textarea}
          cols="50"
          rows="5"
          type="text"
          onChange={validarInputDish}
          value={input.dish_summary}
          name="dish_summary"
        >
          Escribe tu resumen de la receta...
        </textarea>
        {error !== 'No es un texto' ? null : (
          <span className={S.span}>Debe Ingresar un resumen de la receta.</span>
        )}
        <label>Healthy Level:{input.Healthy_food_level}</label>
        <input
          type="range"
          min="1"
          max="100"
          id="range"
          onChange={validarInputNum}
          value={input.Healthy_food_level}
          name="Healthy_food_level"
        />
        {error !== 'Los datos no son Numero' ? null : (
          <span className={S.span}>Ingresa un numero del 1 al 100</span>
        )}
        <label>Score: {input.score}</label>
        <input
          type="range"
          min="1"
          max="100"
          onChange={validarInputNum1}
          value={input.score}
          name="score"
        />
        {error !== 'Los datos no son Numero1' ? null : (
          <span className={S.span}>Ingresa un numero del 1 al 100</span>
        )}
        <label>Step by Step:</label>
        <input
          name="Step_by_step"
          // value={input.Step_by_Step}
          type="text"
          onChange={validarInputStep}
          cols="50"
          rows="5"
        />
        Ingresa el paso a paso de tu receta...
        {error !== 'No es un texto1' ? null : (
          <span className={S.span}>
            Ingresa los pasos a seguir para la receta.
          </span>
        )}
        <label>Image:</label>
        <input
          type="text"
          onChange={validarInputUrl}
          value={input.image}
          name="image"
        />
        {error !== 'Los datos ingresados NO SON URL VALIDOS' ? null : (
          <span className={S.span}>
            Debe ingresar una URL valida para la imagen.
          </span>
        )}
        <select
          className={S.select}
          defaultValue="Diet"
          onChange={evt => handleSelect(evt)}
        >
          <option disabled>Diets</option>
          {type?.map(type => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <button
          className={S.botonCrear}
          disabled={!input.name || !input.dish_summary}
          type="submit"
          value="Crear receta"
        >
          Crear Receta
        </button>
      </form>

      <div className={S.contenedor}>
        {input.diets.map((el, index) => (
          <div className={S.option} key={index}>
            <div className={S.optionP}>
              <p>{el}</p>
              <button onClick={() => handleDelete(el)}>X</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
