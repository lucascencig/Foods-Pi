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

  // function validarInputName(evt) {
  //   if (/\d/.test(evt.target.value)) {
  //     setError('No es un Nombre');
  //   } else {
  //     setError('');
  //   }
  //   handleChange(evt);
  // }
  function validarInputName(e) {
    if (/\d/.test(e.target.value)) {
      setError('Los datos no son validos.');
    } else {
      setError('');
    }
    handleChange(e);
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
      setError('No es un paso a paso');
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

  function validateinputurl(evt) {
    if (
      !/^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/.test(
        evt.target.value
      ) ||
      !/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(evt.target.value)
    ) {
      setError('Los datos ingresados no son correctos url');
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

  async function handleSubmit(evt) {
    setInput({
      name: '',
      dish_summary: '',
      score: '',
      Healthy_food_level: '',
      step_by_Step: '',
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
    }
    alert('¡Debe llenar todos los campos para poder crear la receta!');
  }

  function handleDelete(evt) {
    setInput({
      ...input,
      diets: input.diets.filter(diet => diet !== evt),
    });
  }

  function handleSelectTypes(evt) {
    setInput({
      ...input,
      types: [...input.types, evt.target.value],
    });
  }

  return (
    <div className={S.contenedorForm}>
      <Link to={'/home'}>
        <button>Volver</button>
      </Link>

      <h2>¡Crea tu propia receta!</h2>

      <form className={S.form} onSubmit={handleSubmit}>
        <label htmlFor="">Nombre de la Receta:</label>
        <input
          onChange={validarInputName}
          value={input.name}
          name="name"
          type="text"
          placeholder="Nombre"
        />
        <div className={S.error}>
          <p>
            {error !== 'Los datos no son validos.' ? null : (
              <p>El nombre no puede estar vacio ni contener numeros.</p>
            )}
          </p>
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
          placeholder=" Escribe tu resumen de la receta..."
        ></textarea>
        <div className={S.error}>
          <p>
            {error !== 'No es un Texto' ? null : (
              <p>Debe ingresar un resumen minimo para la receta.</p>
            )}
          </p>
        </div>
        <label>Healthy Level: {input.Healthy_food_level}</label>
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
        <label>Step by Step: </label>

        <input
          className={S.pasoapaso}
          name="Step_by_step"
          value={input.step_by_Step}
          type="text"
          onChange={validarInputStep}
          cols="50"
          rows="5"
          placeholder="Ingresa el paso a paso de tu receta..."
        />
        <div className={S.error}>
          <p>
            {error !== 'No es un paso a paso' ? null : (
              <p>El paso a paso no puede estar vacio.</p>
            )}
          </p>
        </div>
        <label>Image:</label>
        <input
          type="text"
          onChange={validateinputurl}
          value={input.image}
          name="image"
        />
        {error !== 'Los datos ingresados no son correctos url' ? null : (
          <p className={S.span}>Debe ingresar una URL valida para la imagen.</p>
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
        <button className={S.botonCrear} type="submit" value="Crear receta">
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
