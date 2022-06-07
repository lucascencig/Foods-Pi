import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/actions';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import S from '../styles/CardDetail.module.css';

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    console.log(props.match.params.id);
  }, [dispatch]);

  const myFood = useSelector(state => state.detail);
  const diet = myFood.diets;

  const sinSummary = 'This recipe does not contain summary';
  const sinSteps = 'This recipe does not contain steps';

  return (
    <div className={S.contenedorGeneral}>
      <Link to="/home">
        <button className={S.boton}>Atras</button>
      </Link>
      {
        <div>
          <h1 className={S.titulo}>{myFood.name}</h1>
          <img className={S.image} src={myFood.image} alt="img not found" />

          <div className={S.text}>
            <h2>
              Type Diets: <p>{diet?.join('; ')}</p>
            </h2>
            <div className={S.summary}>
              Summary:{' '}
              <p
                dangerouslySetInnerHTML={{
                  __html: myFood.summary ? myFood.summary : sinSummary,
                }}
              ></p>
              <h3>
                Steps: <p>{myFood.steps ? myFood.steps : sinSteps}</p>
              </h3>
              <h4>
                Dish Type:{' '}
                {myFood.types ? myFood.types : 'Not contains types food'}
              </h4>
              <h4>
                Score: {myFood.score ? myFood.score : 'Not Contain score'}
              </h4>
              <h4>Healthy food: {myFood.healthScore}</h4>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { getDetail } from '../actions/actions';
// import S from '../styles/CardDetail.module.css';

// export default function CardDetail(props) {
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(getDetail(id));
//   }, [dispatch, id]);

//   let detalle = useSelector(state => state.detail);
//   if (!detalle) {
//     detalle = {
//       id: 'Not found',
//       name: 'Not Found',
//       image:
//         'https://www.seekpng.com/png/detail/212-2123432_404-error-error-404-in-png.png',
//       dish_summary: 'Not Found',
//       score: 'Not Found',
//       Healthy_food_level: 'Not Found',
//       Step_by_step: 'Not Found',
//     };
//   }

//   return (
//     <div className={S.contenedorGeneral}>
//       {
//         <div>
//           <h1 className={S.titulo}>{myFood.name}</h1>
//           <img className={S.image} src={myFood.image} alt="img not found" />

//           <Link to="/home">
//             <button className={S.boton}>Atras</button>
//           </Link>

//           <div className={S.text}>
//             <h3>
//               Type Diets: <p>{diet?.join('; ')}</p>
//             </h3>
//             <div>
//               Summary:{' '}
//               <p
//                 dangerouslySetInnerHTML={{
//                   __html: myFood.summary ? myFood.summary : sinSummary,
//                 }}
//               ></p>
//               <h3>
//                 Steps: <p>{myFood.steps ? myFood.steps : sinSteps}</p>
//               </h3>
//               <h3>
//                 Dish Type:{' '}
//                 {myFood.types ? myFood.types : 'Not contains types food'}
//               </h3>
//               <h3>Score: {myFood.score}</h3>
//               <h3>Healthy food: {myFood.healthScore}</h3>
//             </div>
//           </div>
//         </div>
//       }
//     </div>
//   );
// }
